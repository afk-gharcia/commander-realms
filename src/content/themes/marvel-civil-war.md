---
name: "Marvel Civil War"
summary: "Heróis divididos entre registro e resistência — Cap e Iron Man lideram lados opostos numa mesa de Guerra Civil."
icon: "/images/themes/marvel-civil-war/icon.png"
cover: "/images/themes/marvel-civil-war/banner.png"
bannerTagline: "Heróis divididos entre registro e resistência."
scenarioTitle: "Heróis divididos"
planechaseTitle: "Locais da guerra"
decksTitle: "Os quatro lados da guerra"
scenario: |
  Neste Realm, os heróis não enfrentam apenas vilões — eles enfrentam uns aos outros.

  Após uma série de conflitos destrutivos, a opinião pública se volta contra os superseres. A sociedade exige controle, responsabilidade e registro, dividindo antigos aliados entre aqueles que defendem a ordem e aqueles que lutam pela liberdade.

  Cada deck representa um lado dessa ruptura, mas todos seguem a mesma regra temática: as criaturas devem ser Heróis do universo Marvel. Durante a partida, a Pressão Pública mede a repercussão dos feitos dos heróis. Ao causar dano com criaturas lendárias, os jogadores acumulam influência e podem convertê-la em Apoio Popular ou Aprovação Oficial.

  Escolha seu lado, lidere seus heróis e entre em uma Guerra Civil onde vencer não significa apenas derrotar seus oponentes, mas conquistar espaço em meio ao julgamento da opinião pública.
howToPlay: |
  Escolha um dos quatro comandantes do Realm, copie o deck correspondente e sorteie o local da guerra antes da partida; depois jogue normalmente seguindo as regras de Commander, mantendo a regra central Pressão Pública ativa durante toda a partida.
badge: "Novo"
status: active

style:
  primaryColor: "#1a3a5c"
  secondaryColor: "#c41e3a"

meta:
  players: "2-4"
  bracket: 3
  tableType: closed

decks:
  - name: "Secret Avengers"
    commanders:
      - "Captain America, Team Leader"
    commanderArt:
      set: "msc"
      collectorNumber: "5"
    moxfieldUrl: "https://www.moxfield.com/decks/f22bVROmQUCdXQP2_aeIiQ"
    thematicText: "O lado clandestino da resistência — heróis que operam nas sombras contra o Ato de Registro."
    illustrativeCards:
      - name: "Winter Soldier, Reborn Avenger"
        set: "msc"
        collectorNumber: "326"
      - name: "Hawkeye, Avenging Archer"
        set: "msc"
        collectorNumber: "405"
      - name: "Scarlet Witch, Chaotic Avenger"
        set: "msc"
        collectorNumber: "414"
      - name: "Falcon and Redwing"
        set: "msc"
        collectorNumber: "304"
      - name: "Black Widow, Agile Avenger"
        set: "msc"
        collectorNumber: "395"

  - name: "Wakanda Neutrality"
    commanders:
      - "T'Challa, the Black Panther"
    commanderArt:
      set: "msc"
      collectorNumber: "7"
    moxfieldUrl: "https://www.moxfield.com/decks/tSVbdtdCBUah6rDouotw7A"
    thematicText: "Wakanda permanece neutra na guerra, protegendo seu povo sem se alinhar abertamente a nenhum lado."
    illustrativeCards:
      - name: "Okoye, Mighty and Adored"
        set: "msc"
        collectorNumber: "410"
      - name: "Shuri, the Black Panther"
        set: "msc"
        collectorNumber: "416"
      - name: "W'Kabi, Shield of the Nation"
        set: "msc"
        collectorNumber: "387"
      - name: "Nakia, Wakandan Operative"
        set: "msc"
        collectorNumber: "384"
      - name: "Zuri, Warrior of Wakanda"
        set: "msc"
        collectorNumber: "389"

  - name: "Registration Act"
    commanders:
      - "Iron Man, Titan of Innovation"
    commanderArt:
      set: "sld"
      collectorNumber: "1731"
    moxfieldUrl: "https://www.moxfield.com/decks/1i8_kMxPWUSMq1wQGB95mg"
    thematicText: "O governo e os heróis pró-registro — ordem, lei e o Ato de Registro como caminho para a segurança."
    illustrativeCards:
      - name: "War Machine, Avenging Arsenal"
        set: "msc"
        collectorNumber: "375"
      - name: "Rescue, Pepper Potts"
        set: "msc"
        collectorNumber: "755"
      - name: "Daredevil, Fearless Fighter"
        set: "msc"
        collectorNumber: "685"
      - name: "Spider-Gwen, Free Spirit"
        set: "msc"
        collectorNumber: "874"
      - name: "Thor, God of Thunder"
        set: "msh"
        collectorNumber: "338"

  - name: "Mutant Resistance"
    commanders:
      - "Storm, Force of Nature"
    commanderArt:
      set: "sld"
      collectorNumber: "1742"
    moxfieldUrl: "https://www.moxfield.com/decks/2eyCZJ1JyEu08_aW2DrPEg"
    thematicText: "Mutantes e aliados que resistem à caça e à criminalização dos não-registrados."
    illustrativeCards:
      - name: "Wolverine, Best There Is"
        set: "sld"
        collectorNumber: "1737"
      - name: "Astonishing Spider-Man"
        set: "msc"
        collectorNumber: "740"
      - name: "Moon Girl and Devil Dinosaur"
        set: "msh"
        collectorNumber: "421"
      - name: "Hulk, Always Angry"
        set: "msc"
        collectorNumber: "502"
      - name: "She-Hulk, Jade Defender"
        set: "msh"
        collectorNumber: "188"

tableRule:
  name: "Pressão Pública"
  subtitle: "Regra Geral"
  image: "/images/table-rules/marvel-civil-war/public-pressure.png"
  effect: |
    Cada jogador começa com **0** pontos de Pressão Pública.

    Uma vez por turno, quando uma ou mais criaturas lendárias que você controla causarem dano de combate a um jogador, você ganha **1** ponto de Pressão Pública.

    Você não pode ganhar esse ponto causando dano ao mesmo jogador que lhe deu Pressão Pública no seu turno anterior.

    Quando você chegar a **3** pontos de Pressão Pública, escolha um:

    - **Apoio Popular** — Compre 1 carta e coloque um marcador +1/+1 em até uma criatura lendária que você controla.
    - **Aprovação Oficial** — Crie uma ficha de Tesouro e vire até uma criatura alvo que um oponente controla.

    Depois, sua Pressão Pública volta para **0**.

planechase:
  - number: "001/005"
    name: "Stamford, Connecticut"
    subtitle: "Frente de Guerra Civil"
    effect: "A primeira criatura lendária que cada jogador conjura em seu turno custa {1} a menos para ser conjurada."
    flavor: "Tudo começou aqui. Um desastre, uma decisão impossível, e o mundo nunca mais foi o mesmo."
    image: "/images/planechase/marvel-civil-war/001-stamford-connecticut.png"

  - number: "002/005"
    name: "Ilha Ryker"
    subtitle: "Frente de Guerra Civil"
    effect: "No início do combate de cada jogador, aquele jogador pode virar uma criatura lendária desvirada que controla. Se fizer isso, vire até uma criatura alvo que um oponente controla."
    flavor: "Cada avanço exigia precisão. Cada erro, uma captura."
    image: "/images/planechase/marvel-civil-war/002-rykers-island.png"

  - number: "003/005"
    name: "Ponte do Brooklyn"
    subtitle: "Frente de Guerra Civil"
    effect: "Criaturas lendárias têm vigilância."
    flavor: "Mesmo sob fogo cruzado, os heróis não podiam baixar a guarda."
    image: "/images/planechase/marvel-civil-war/003-brooklyn-bridge.png"

  - number: "004/005"
    name: "Esconderijo dos Vingadores Secretos"
    subtitle: "Frente de Guerra Civil"
    effect: "Criaturas lendárias têm ward {1}."
    flavor: "Nas sombras, a resistência encontrava abrigo, aliados e tempo para reagir."
    image: "/images/planechase/marvel-civil-war/004-secret-avengers-hideout.png"

  - number: "005/005"
    name: "Ruas de Nova York"
    subtitle: "Frente de Guerra Civil"
    effect: "Uma vez por turno, quando uma ou mais criaturas lendárias atacarem o jogador com maior total de vida ou empatado com o maior total de vida, o controlador daquelas criaturas compra 1 carta."
    flavor: "Sob sirenes e holofotes, cada investida moldava o rumo da guerra."
    image: "/images/planechase/marvel-civil-war/005-new-york-streets.png"
---

## Sobre a mesa

Mesa temática **fechada** com **4 decks prontos**, todos calibrados para ficarem próximos em **power level 7**, **Bracket 3**. A partida evoca o clima da **Guerra Civil** Marvel: heróis divididos, imprensa, pressão pública e batalhas em locais icônicos.

## Regra temática principal

> **Toda criatura do deck precisa ser um herói do universo Marvel.**

Cartas que não representem heróis Marvel (criaturas genéricas, tokens que não sejam heróis, etc.) não podem estar no deck. As regras oficiais do Magic continuam valendo acima desta restrição temática.

## Como jogar

Escolha um dos quatro comandantes do Realm, copie o deck correspondente e sorteie o local da guerra antes da partida; depois jogue normalmente seguindo as regras de Commander, mantendo a regra central Pressão Pública ativa durante toda a partida.

## Os quatro lados da guerra

| Deck | Comandante | Moxfield |
|------|------------|----------|
| Secret Avengers | Captain America, Team Leader | [Abrir deck](https://www.moxfield.com/decks/f22bVROmQUCdXQP2_aeIiQ) |
| Wakanda Neutrality | T'Challa, the Black Panther | [Abrir deck](https://www.moxfield.com/decks/tSVbdtdCBUah6rDouotw7A) |
| Registration Act | Iron Man, Titan of Innovation | [Abrir deck](https://www.moxfield.com/decks/1i8_kMxPWUSMq1wQGB95mg) |
| Mutant Resistance | Storm, Force of Nature | [Abrir deck](https://www.moxfield.com/decks/2eyCZJ1JyEu08_aW2DrPEg) |
