import { defineCollection, z } from 'astro:content';

const cardArtSchema = z.object({
  scryfallId: z.string().optional(),
  set: z.string().optional(),
  collectorNumber: z.string().optional(),
});

const illustrativeCardSchema = z.union([
  z.string(),
  cardArtSchema.extend({ name: z.string() }),
]);

const deckSchema = z.object({
  name: z.string(),
  commanders: z.array(z.string()),
  moxfieldUrl: z.string().url(),
  thematicText: z.string().optional(),
  illustrativeCards: z.array(illustrativeCardSchema).optional(),
  commanderArt: cardArtSchema.optional(),
});

const planechaseSchema = z.object({
  number: z.string().optional(),
  name: z.string(),
  subtitle: z.string().optional(),
  effect: z.string(),
  flavor: z.string().optional(),
  image: z.string(),
});

const themes = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    icon: z.string().optional(),
    cover: z.string().optional(),
    bannerTagline: z.string().optional(),
    scenario: z.string().optional(),
    scenarioTitle: z.string().optional(),
    howToPlayTitle: z.string().optional(),
    howToPlay: z.string().optional(),
    planechaseTitle: z.string().optional(),
    decksTitle: z.string().optional(),
    commandersImage: z.string().optional(),
    badge: z.string().optional(),
    status: z.enum(['active', 'archived']),
    style: z
      .object({
        primaryColor: z.string(),
        secondaryColor: z.string(),
      })
      .optional(),
    meta: z
      .object({
        players: z.union([z.number(), z.string()]).optional(),
        powerLevel: z.number().optional(),
        bracket: z.number().optional(),
        tableType: z.string().optional(),
      })
      .optional(),
    decks: z.array(deckSchema),
    tableRule: z
      .object({
        name: z.string(),
        subtitle: z.string().optional(),
        image: z.string(),
        effect: z.string(),
      })
      .optional(),
    planechase: z.array(planechaseSchema),
  }),
});

export const collections = { themes };
