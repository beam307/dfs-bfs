import { Table } from './components/Table/Table'
import './App.scss';
import Dfs from "./algorithms/dfs";

export type cell = {
  visit: boolean;
  wall: number;
  start?: boolean;
  end?: boolean;
}

export type coordinate = {
  x: number,
  y: number,
  visit?: boolean
}

function App() {
  const ROW = 15;
  const COL = 25;
  const start: coordinate = {x: 0, y: 6};
  const end: coordinate = {x: 24, y: 6};
  let dfsObject: Dfs;
  let tile: cell[][] = [];
  for (let i = 0; i < ROW; i++) {
    tile[i] = new Array(ROW);
    for (let j = 0; j < COL; j++) {
      tile[i][j] = {visit: false, wall: 0};
    }
  }
  tile[start.y][start.x].start = true;
  tile[end.y][end.x].end = true;

  const onChange = (row: number, col: number, wall: number) => {
    tile[row][col] = { visit: false, wall };
  }

  const dfs = () => {
    dfsObject = new Dfs(tile, start, end, ROW, COL);
    dfsObject.start();
  }
  const check = () => {
    dfsObject.getTile();
  }

  return (
      <div className="App">
        <button onClick={dfs}>start</button>
        <button onClick={check}>check</button>
        <Table tile={tile} start={start} end={end} onChange={onChange}/>
      </div>
  );
}

export default App;
