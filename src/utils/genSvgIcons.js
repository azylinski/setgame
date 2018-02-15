const fs = require("fs");
const pug = require("pug");
const { buildDeck, codeToObj } = require("../SetGame");

const renderFn = pug.compileFile("src/utils/svg.pug", {
  pretty: true,
  debug: false,
  inlineRuntimeFunctions: true
});
const cards = buildDeck();

// console.log(codeToObj('3sOg'));

cards.forEach(code => {
  const fn = `public/icons/${code}.svg`;
  fs.writeFileSync(fn, renderFn(codeToObj(code)));
});
