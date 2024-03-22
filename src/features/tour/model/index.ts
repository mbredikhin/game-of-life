import { TourButton, TourButtonType, TourStep, TourStepID } from './types';

export { type TourButton, TourButtonType, type TourStep, TourStepID };

export const buttons: Record<TourButtonType, TourButton> = {
  cancel: {
    text: 'Exit',
    type: TourButtonType.Cancel,
  },
  back: {
    text: 'Back',
    type: TourButtonType.Back,
  },
  next: {
    text: 'Next',
    type: TourButtonType.Next,
  },
};

export const steps: TourStep[] = [
  {
    id: TourStepID.Initial,
    buttons: [buttons.cancel, buttons.next],
    title: "Welcome to Conway's Game of Life!",
    text: ['This short introduction should help you with some basics of this game.'],
  },
  {
    id: TourStepID.Instruction,
    buttons: [buttons.cancel, buttons.next],
    title: 'Instruction',
    text: ['Here you can read about rules of evolution.'],
    position: 'bottom-left',
  },
  {
    id: TourStepID.Settings,
    buttons: [buttons.cancel, buttons.next],
    title: 'Settings',
    text: ['Here you can set size of the board and time between two iterations.'],
    position: 'bottom-left',
  },
  {
    id: TourStepID.PatternsLibrary,
    buttons: [buttons.cancel, buttons.back, buttons.next],
    title: 'Patterns library',
    text: [
      'Library that contains many patterns grouped by type.',
      'Select any of them and apply it anywhere on the board.',
    ],
  },
  {
    id: TourStepID.InitRandomly,
    buttons: [buttons.cancel, buttons.back, buttons.next],
    title: 'Init board with random population',
    text: ['Just a random population generator.'],
  },
  {
    id: TourStepID.ClearBoard,
    buttons: [buttons.back, buttons.cancel, buttons.next],
    title: 'Clear board',
    text: ['Clear board in a single click.'],
  },
  {
    id: TourStepID.Start,
    buttons: [buttons.cancel, buttons.back],
    title: 'Start the game',
    text: ['Now you are ready to start!'],
  },
];
