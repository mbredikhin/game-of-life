import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import type { ISettings } from "@/features/settings";
import { GameStatus } from "@/utils/constants";
import type { GridProps, TGrid } from "../../types";
import { Cell } from "../Cell";
import styles from "./Grid.module.css";

type Coords = Record<"x" | "y", number>;

export function Grid({ status }: GridProps) {
  const [grid, setGrid] = useState<TGrid>([]);
  const settings = useAppSelector((state) => state.settings);

  useEffect(() => {
    init(settings.grid);
    const id = loop(status);
    window.clearInterval(id - 1);
  }, [status, settings.grid]);

  function init(settings: ISettings["grid"]) {
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
      if (status === GameStatus.PAUSED) {
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
