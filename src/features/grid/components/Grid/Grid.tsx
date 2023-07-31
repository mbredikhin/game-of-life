import type { TSettings } from "@/features/settings";
import { useEffect, useState } from "react";
import type { GridProps, TGrid } from "@/features/grid/types";
import { Cell } from "@/features/grid/components/Cell";
import styles from "./Grid.module.css";
import { GAME_STATUSES } from "@/App";

type Coords = Record<"x" | "y", number>;

export function Grid({ settings, status }: GridProps) {
  const [grid, setGrid] = useState<TGrid>([]);

  useEffect(() => {
    init(settings.grid);
    const id = loop(status);
    window.clearInterval(id - 1);
  }, [status]);

  function init(settings: TSettings["grid"]) {
    const grid: TGrid = Array.from({ length: settings.height }).map(() =>
      Array.from({ length: settings.width }).map(() => false)
    );
    setGrid(grid);
  }

  function changeCell(isPopulated: boolean, coords: Coords) {
    const row = [
      ...grid[coords.y].slice(0, coords.x),
      isPopulated,
      ...grid[coords.y].slice(coords.x + 1),
    ];
    changeRow(row, coords.y);
  }

  function changeRow(row: boolean[], index: number) {
    setGrid((grid) => [...grid.slice(0, index), row, ...grid.slice(index + 1)]);
  }

  function loop(status: GridProps["status"]) {
    return setInterval(() => {
      if (status === GAME_STATUSES.PAUSED) {
        return;
      }

      setGrid((grid: TGrid) => {
        return grid.map((row, y) => {
          return row.map((cell, x) => {
            const neighboursCoords: Coords[] = [
              { x: x - 1, y: y + 1 },
              { x, y: y + 1 },
              { x: x + 1, y: y + 1 },
              { x: x - 1, y },
              { x: x + 1, y },
              { x: x - 1, y: y - 1 },
              { x, y: y - 1 },
              { x: x + 1, y: y - 1 },
            ];
            const populatedNeighbours = neighboursCoords.reduce(
              (acc, { x, y }) =>
                grid[y] && grid[y][x] ? [...acc, { x, y }] : acc,
              [] as Coords[]
            );
            if (cell) {
              return (
                populatedNeighbours.length > 1 && populatedNeighbours.length < 4
              );
            } else {
              return populatedNeighbours.length === 3;
            }
          });
        });
      });
    }, settings.tick);
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["grid"]}>
        {grid.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}:${x}`}
                {...(x === 0 &&
                  y === 0 && {
                    corner: "lt",
                  })}
                {...(x === row.length - 1 &&
                  y === 0 && {
                    corner: "rt",
                  })}
                {...(x === 0 &&
                  y === grid.length - 1 && {
                    corner: "rt",
                  })}
                {...(x === 0 &&
                  y === grid.length - 1 && {
                    corner: "lb",
                  })}
                {...(x === row.length - 1 &&
                  y === grid.length - 1 && {
                    corner: "rb",
                  })}
                isPopulated={cell}
                changeState={(value) => changeCell(value, { x, y })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
