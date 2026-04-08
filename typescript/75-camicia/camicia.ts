export type Card = string;

export interface GameResult {
  status: 'finished' | 'loop';
  cards: number;
  tricks: number;
}

type Player = 'A' | 'B';

export const simulateGame = (
  playerA: Card[],
  playerB: Card[]
): GameResult => {
  const deckA: Card[] = [...playerA];
  const deckB: Card[] = [...playerB];
  let items: Card[] = [];

  let tricks = 0;
  let cardsPlayed = 0;

  let turn: Player = 'A';
  let mode: 'normal' | 'penalty' = 'normal';
  let penaltyRemaining = 0;
  let lastPlayer: Player | null = null;

  const history = new Set<string>();

  const getDeckState = (): string => {
    const mask = (c: Card) => (['J', 'Q', 'K', 'A'].includes(c) ? c : 'N');
    return deckA.map(mask).join('') + '|' + deckB.map(mask).join('');
  };

  if (deckA.length === 0 || deckB.length === 0) {
    return { status: 'finished', cards: 0, tricks: 0 };
  }

  while (true) {
    if (items.length === 0) {
      const state = getDeckState();
      if (history.has(state)) {
        return { status: 'loop', cards: cardsPlayed, tricks };
      }
      history.add(state);
    }

    const activeDeck: string[] = turn === 'A' ? deckA : deckB;

    if (activeDeck.length === 0) {
      const winningDeck = turn === 'A' ? deckB : deckA;
      winningDeck.push(...items);
      items = [];
      tricks++;
      return { status: 'finished', cards: cardsPlayed, tricks };
    }

    const card = activeDeck.shift()!;
    items.push(card);
    cardsPlayed++;

    let isPayment = false;
    let penaltyVal = 0;

    if (card === 'J') { isPayment = true; penaltyVal = 1; }
    else if (card === 'Q') { isPayment = true; penaltyVal = 2; }
    else if (card === 'K') { isPayment = true; penaltyVal = 3; }
    else if (card === 'A') { isPayment = true; penaltyVal = 4; }

    if (isPayment) {
      mode = 'penalty';
      penaltyRemaining = penaltyVal;
      lastPlayer = turn;
      turn = turn === 'A' ? 'B' : 'A';
    } else {
      if (mode === 'normal') {
        turn = turn === 'A' ? 'B' : 'A';
      } else {
        penaltyRemaining--;
        if (penaltyRemaining === 0) {
          const collectingDeck: string[] = lastPlayer === 'A' ? deckA : deckB;

          collectingDeck.push(...items);
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
