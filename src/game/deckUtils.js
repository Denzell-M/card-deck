export const SUITS = ["♥", "♦", "♣", "♠"];
export const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export function makeStandardDeck() {
  const deck = [];

  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({
        id: `${value}${suit}`,
        suit,
        value,
      });
    }
  }

  return deck;
}

export function shuffleArray(deckArray) {
  const arr = [...deckArray];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function drawOneRandom(deck) {
  if (deck.length === 0) return { card: null, nextDeck: deck };

  const idx = Math.floor(Math.random() * deck.length);
  const card = deck[idx];
  const nextDeck = deck.filter((_, i) => i !== idx);

  return { card, nextDeck };
}

export function drawNRandom(deck, n) {
  let currentDeck = deck;
  const drawn = [];

  const count = Math.min(n, currentDeck.length);

  for (let i = 0; i < count; i++) {
    const { card, nextDeck } = drawOneRandom(currentDeck);
    if (!card) break;

    drawn.push(card);
    currentDeck = nextDeck;
  }

  return { drawn, nextDeck: currentDeck };
}
