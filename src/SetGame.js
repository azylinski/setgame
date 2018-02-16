import Combinatorics from "js-combinatorics";
import { knuthShuffle as shuffle } from "knuth-shuffle";
import { Game } from "boardgame.io/core";
import { FEATURES } from "./const"

export const buildDeck = (mode = "Chars") => {
  let it = Combinatorics.cartesianProduct(
    FEATURES[mode]["Numbers"],
    FEATURES[mode]["Symbols"],
    FEATURES[mode]["Shadings"],
    FEATURES[mode]["Colors"]
  );

  return shuffle(it.map(props => props.join("")));
};

const isSet = (picked) => {
  for (let i=0; i<4; i++) {
    const s = new Set([ picked[0][i], picked[1][i], picked[2][i] ]);
    if (s.size === 2) return false;
  }

  return true;
}

export const SetGame = Game({
  setup: (numPlayers) => ({
    deck: buildDeck(),
    board: [...Array(12).keys()],
    next: 12,
    scores: Array(numPlayers).fill(0)
  }),

  moves: {
    check(G, ctx, picked) {
      if (!isSet(picked)) return G;

      let scores = [...G.scores];
      scores[ctx.currentPlayer]++;

      let next = G.next;
      let board = [...G.board];
      for (let i=0; i<picked.length; i++) {
        const cardId = picked[i];
        const deckIdx = G.deck.indexOf(cardId);
        const pos = board.indexOf(deckIdx);

        board[pos] = next;
        next++;
      }

      return { ...G, board, next, scores };
    }
  }
});
