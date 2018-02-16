import { Client } from "boardgame.io/client";
import { SetGame } from "./SetGame";
import Board from "./Board";

const App = Client({
  game: SetGame,
  board: Board,
});

export default App;
