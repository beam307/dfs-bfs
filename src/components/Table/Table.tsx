import * as React from 'react';
import { useState } from 'react';
import './table.scss';
import isEqual from 'lodash/isEqual';

type Props = {
  row: number;
  col: number;
  start: { x: number, y: number };
  end: { x: number, y: number };
  onChange: (row: number, col: number, value: number) => void;
};
export const Table = (props: Props) => {

  const { row, col, start, end, onChange } = props;
  const [current, setCurrent] = useState<{ row: number, col: number }>({ row, col });
  const [active, setActive] = useState<boolean>(false);

  const rows = Array.from(Array(row));
  const cols = Array.from(Array(col));

  const transition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { row, col } = getRowCol(event);
    if (!event.currentTarget.classList.contains('fixed')) {
      if (event.currentTarget.classList.contains('active')) {
        event.currentTarget.classList.remove('active');
        onChange(row, col, 0);
      } else {
        event.currentTarget.classList.add('active');
        onChange(row, col, 1);
      }
    }
  }

  const getRowCol = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const row = Math.floor(Number(event.currentTarget.dataset.id) / 100);
    const col = Number(event.currentTarget.dataset.id) % 100;
    return { row, col };
  }

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActive(true);
    transition(event);
  }

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCurrent(getRowCol(event));
    if (active && !isEqual(current, getRowCol(event))) {
      transition(event);
    }
  }

  return (
      <div className="root">
        {rows.map((r, ri) => (
            <div key={ri} className="row">
              {cols.map((c, ci) =>
                  (<div key={ci}
                        data-id={String(ri * 100 + ci)}
                        className={`col ${(ri == start.y && ci == start.x) || (ri == end.y && ci == end.x) ? 'fixed' : ''}`}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={() => setActive(false)}
                  >
                    <div className="cell"></div>
                  </div>))}
            </div>))}
      </div>
  );
};
