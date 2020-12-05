import { Table } from './components/Table/Table'
import './App.scss';

export type cell = {
  visit: boolean;
  value: number;
  start?: boolean;
  end?: boolean;
}

function App() {
  const ROW = 15;
  const COL = 25;
  const start = {x: 0, y: 6};
  const end = {x: 24, y: 6};
  let tile: cell[][] = Array.from(Array(ROW), () => new Array(COL).fill({visit: false, value: 0}));
  tile[start.y][start.x].start = true;
  tile[end.y][end.x].end = true;

  const onChange = (row: number, col: number, value: number) => {
    tile[row][col] = { visit: false, value };
  }

  return (
      <div className="App">
        <Table row={ROW} col={COL} start={start} end={end} onChange={onChange}/>
      </div>
  );
}

export default App;
