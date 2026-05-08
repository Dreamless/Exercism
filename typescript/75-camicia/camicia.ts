export type Card = string;
export type CardValue = 0 | 1 | 2 | 3 | 4;

export interface GameResult {
  status: 'finished' | 'loop';
  cards: number;
  tricks: number;
}

const CARD_MAP: Record<string, CardValue> = {
  'A': 4, 'K': 3, 'Q': 2, 'J': 1,
  '10': 0, '9': 0, '8': 0, '7': 0, '6': 0, '5': 0, '4': 0, '3': 0, '2': 0
};

export const simulateGame = (
  playerA: Card[],
  playerB: Card[]
): GameResult => {
  const deckA: CardValue[] = playerA.map(c => CARD_MAP[c]);
  const deckB: CardValue[] = playerB.map(c => CARD_MAP[c]);

  let items: CardValue[] = [];
  let tricks = 0;
  let cardsPlayed = 0;

  let turn: 'A' | 'B' = 'A';
  let mode: 'normal' | 'penalty' = 'normal';
  let penaltyRemaining = 0;
  let lastPlayer: 'A' | 'B' | null = null;

  const history = new Set<string>();

  if (deckA.length === 0 || deckB.length === 0) {
    return { status: 'finished', cards: 0, tricks: 0 };
  }

  while (true) {
    if (items.length === 0) {
      const state = deckA.join('') + '|' + deckB.join('');
      if (history.has(state)) {
        return { status: 'loop', cards: cardsPlayed, tricks };
      }
      history.add(state);
    }

    const activeDeck: CardValue[] = turn === 'A' ? deckA : deckB;

    if (activeDeck.length === 0) {
      const deck: CardValue[] = lastPlayer === 'A' ? deckA : deckB;
      deck.push(...items);

      tricks++;
      return { status: 'finished', cards: cardsPlayed, tricks };
    }

    const card: CardValue = activeDeck.shift()!;
    items.push(card);
    cardsPlayed++;

    if (card > 0) {
      mode = 'penalty';
      penaltyRemaining = card;
      lastPlayer = turn;
      turn = turn === 'A' ? 'B' : 'A';
    } else {
      if (mode === 'normal') {
        turn = turn === 'A' ? 'B' : 'A';
      } else {
        penaltyRemaining--;
        if (penaltyRemaining === 0) {
          const deck: CardValue[] = lastPlayer === 'A' ? deckA : deckB;
          deck.push(...items);

          items = [];
          tricks++;

          if (deckA.length === 0 || deckB.length === 0) {
            return { status: 'finished', cards: cardsPlayed, tricks };
          }

          turn = lastPlayer!;
          mode = 'normal';
        }
      }
    }
  }
};
