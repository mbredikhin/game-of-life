export enum TourButtonType {
  Cancel = 'cancel',
  Back = 'back',
  Next = 'next',
}

export enum TourStepID {
  Initial,
  Settings,
  PatternsLibrary,
  InitRandomly,
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
  buttons: TourButton[];
  title: string;
  text: string[];
}
