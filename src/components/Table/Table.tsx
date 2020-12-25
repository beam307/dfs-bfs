import * as React from 'react';
import { useState } from 'react';
import './table.scss';
import isEqual from 'lodash/isEqual';
import { cell, coordinate } from "../../App";

type Props = {
  start: coordinate;
  tile: cell[][],
  end: coordinate;
  onChange: (row: number, col: number, wall: number) => void;
};
export const Table = (props: Props) => {

  const { tile, start, end, onChange } = props;
  const [current, setCurrent] = useState<{ row: number, col: number }>({ row: 0, col: 0 });
  const [active, setActive] = useState<boolean>(false);

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

  const fixed = (rIndex: number, cIndex: number) => {
    return (rIndex === start.y && cIndex === start.x) || (rIndex === end.y && cIndex === end.x);
  }

  return (
      <div className="root">
        {
          tile.map((row, rIndex) => (
              <div key={rIndex} className="row">
                {
                  row.map((col, cIndex) => (
                      <div key={cIndex}
                           data-id={String(rIndex * 100 + cIndex)}
                           className={`col ${fixed(rIndex, cIndex) ? 'fixed' : ''} ${col.visit ? 'visit': ''}`}
                           onMouseDown={onMouseDown}
                           onMouseMove={onMouseMove}
                           onMouseUp={() => setActive(false)}
                      >
                        <div className="cell"></div>
                      </div>))
                }
              </div>
          ))
        }
      </div>
  );
};
