import Combinatorics from "js-combinatorics";
import { knuthShuffle as shuffle } from "knuth-shuffle";

export const FEATURES = {
  Types: ["Number", "Symbol", "Shading", "Color"],
  Names: {
    Numbers: ["one", "two", "three"],
    Symbols: ["diamond", "squiggle", "oval"],
    Shadings: ["solid", "striped", "open"],
    Colors: ["red", "green", "purple"]
  },
  Chars: {
    Numbers: ["1", "2", "3"],
    Symbols: ["d", "s", "o"],
    Shadings: ["S", "T", "O"],
    Colors: ["r", "g", "p"]
  }
};

export const charToName = c => {
  let name = null;

  FEATURES.Types.forEach(t => {
    for (let i = 0; i < 3; i++) {
      if (FEATURES.Chars[t+"s"][i] === c) {
        name = FEATURES.Names[t+"s"][i];
      }
    }
  });

  return name;
};

export const codeToObj = code => {
  let obj = {};
  for (let i = 0; i < code.length; i++) {
    obj[FEATURES.Types[i]] = charToName(code[i]);
  }

  return obj;
};

export const buildDeck = (mode = "Chars") => {
  let it = Combinatorics.cartesianProduct(
    FEATURES[mode]["Numbers"],
    FEATURES[mode]["Symbols"],
    FEATURES[mode]["Shadings"],
    FEATURES[mode]["Colors"]
  );

  return shuffle(it.map(props => props.join("")));
};
