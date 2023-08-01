import { TSettings } from "@/features/settings";
import { GameStatus } from "@/utils/constants";

export type TGrid = boolean[][];

export type GridProps = {
  settings: TSettings;
  status: GameStatus;
};
