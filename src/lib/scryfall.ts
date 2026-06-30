const SCRYFALL_BASE = 'https://api.scryfall.com';
const USER_AGENT = 'CommanderRealms/1.0 (https://github.com/command-realms)';

interface ScryfallCard {
  name: string;
  image_uris?: { normal?: string };
  card_faces?: Array<{ image_uris?: { normal?: string } }>;
}

export interface CommanderArtPreference {
  scryfallId?: string;
  set?: string;
  collectorNumber?: string;
}

export interface DeckForArt {
  name: string;
  commanders: string[];
  commanderArt?: CommanderArtPreference;
}

function cardImageUrl(data: ScryfallCard): string | null {
  return data.image_uris?.normal ?? data.card_faces?.[0]?.image_uris?.normal ?? null;
}

/** Direct Scryfall image redirect — no API JSON call, avoids rate limits at build/dev. */
export function scryfallPrintImageUrl(
  art?: CommanderArtPreference,
  version: 'normal' | 'large' = 'normal',
): string | null {
  if (art?.set && art.collectorNumber) {
    return `${SCRYFALL_BASE}/cards/${encodeURIComponent(art.set)}/${encodeURIComponent(art.collectorNumber)}?format=image&version=${version}`;
  }
  return null;
}

export function scryfallLargeImage(url: string): string {
  if (url.includes('format=image')) {
    return url.replace('version=normal', 'version=large');
  }
  return url.replace('/normal/', '/large/');
}

async function scryfallFetch(path: string): Promise<ScryfallCard | null> {
  try {
    const res = await fetch(`${SCRYFALL_BASE}${path}`, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as ScryfallCard;
  } catch {
    return null;
  }
}

/**
 * Commander art from Scryfall.
 * Priority: scryfallId → set + collectorNumber → set only → fuzzy name.
 */
export async function fetchCommanderImage(
  cardName: string,
  art?: CommanderArtPreference,
): Promise<string | null> {
  const direct = scryfallPrintImageUrl(art);
  if (direct) return direct;

  if (art?.scryfallId) {
    const byId = await scryfallFetch(`/cards/${encodeURIComponent(art.scryfallId)}`);
    if (byId) return cardImageUrl(byId);
  }

  if (art?.set) {
    const bySet = await scryfallFetch(
      `/cards/named?exact=${encodeURIComponent(cardName)}&set=${encodeURIComponent(art.set)}`,
    );
    if (bySet) return cardImageUrl(bySet);
  }

  const byExact = await scryfallFetch(`/cards/named?exact=${encodeURIComponent(cardName)}`);
  if (byExact) return cardImageUrl(byExact);

  const byName = await scryfallFetch(`/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
  return byName ? cardImageUrl(byName) : null;
}

/** @deprecated Use fetchCommanderImage */
export async function fetchCardImage(cardName: string): Promise<string | null> {
  return fetchCommanderImage(cardName);
}

export interface CommanderArt {
  commander: string;
  deckName: string;
  image: string | null;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface DeckDisplayData {
  name: string;
  commander: string;
  moxfieldUrl: string;
  thematicText: string;
  commanderImage: string | null;
  creatures: Array<{ name: string; image: string | null }>;
}

export interface IllustrativeCard {
  name: string;
  scryfallId?: string;
  set?: string;
  collectorNumber?: string;
}

export type IllustrativeCardInput = string | IllustrativeCard;

export interface DeckForDisplay extends DeckForArt {
  moxfieldUrl: string;
  thematicText?: string;
  illustrativeCards?: IllustrativeCardInput[];
}

function normalizeIllustrativeCard(card: IllustrativeCardInput): IllustrativeCard {
  return typeof card === 'string' ? { name: card } : card;
}

/** Commander + illustrative creature art per deck, fetched sequentially for Scryfall rate limits. */
export async function fetchDeckDisplayData(decks: DeckForDisplay[]): Promise<DeckDisplayData[]> {
  const results: DeckDisplayData[] = [];

  for (const deck of decks) {
    const commander = deck.commanders[0] ?? '';
    const commanderImage = commander ? await fetchCommanderImage(commander, deck.commanderArt) : null;
    if (!scryfallPrintImageUrl(deck.commanderArt)) await delay(150);

    const creatures: Array<{ name: string; image: string | null }> = [];
    for (const raw of deck.illustrativeCards ?? []) {
      const card = normalizeIllustrativeCard(raw);
      const image = await fetchCommanderImage(card.name, card);
      creatures.push({ name: card.name, image });
      if (!scryfallPrintImageUrl(card)) await delay(150);
    }

    results.push({
      name: deck.name,
      commander,
      moxfieldUrl: deck.moxfieldUrl,
      thematicText: deck.thematicText ?? '',
      commanderImage,
      creatures,
    });
  }

  return results;
}

/** One art entry per deck (first commander), fetched sequentially for Scryfall rate limits. */
export async function fetchDeckCommanderArts(decks: DeckForArt[]): Promise<CommanderArt[]> {
  const results: CommanderArt[] = [];

  for (const deck of decks) {
    const commander = deck.commanders[0] ?? '';
    const image = commander ? await fetchCommanderImage(commander, deck.commanderArt) : null;
    results.push({ commander, deckName: deck.name, image });
    await delay(150);
  }

  return results;
}
