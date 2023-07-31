import { TSettings } from "@/features/settings";

export type TGrid = boolean[][];

export type GridProps = {
  settings: TSettings;
  status: GameStatus;
};

export type GameStatus = "PLAY" | "PAUSED";
