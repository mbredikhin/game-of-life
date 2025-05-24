import { RelativePosition } from '@/shared/lib';

export enum TourButtonType {
  Close,
  Back,
  Next,
  Finish,
}

export enum TourStepID {
  Initial,
  Settings,
  PatternsLibrary,
  RandomPopulation,
  Start,
  ClearBoard,
  Instruction,
}

export interface TourButton {
  text: string;
  type: TourButtonType;
}

export interface TourStep {
  id: TourStepID;
  buttons: TourButtonType[];
  title: string;
  text: string[];
  position?: RelativePosition;
}
