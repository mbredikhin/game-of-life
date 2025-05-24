import { TourButton, TourButtonType, TourStep, TourStepID } from './types';

export { TourButtonType, type TourStep, TourStepID };

export const buttons: Record<TourButtonType, TourButton> = {
  [TourButtonType.Close]: {
    text: 'Close',
    type: TourButtonType.Close,
  },
  [TourButtonType.Back]: {
    text: '< Back',
    type: TourButtonType.Back,
  },
  [TourButtonType.Next]: {
    text: 'Next >',
    type: TourButtonType.Next,
  },
  [TourButtonType.Finish]: {
    text: "Let's go",
    type: TourButtonType.Close,
  },
};

export const steps: TourStep[] = [
  {
    id: TourStepID.Initial,
    buttons: [TourButtonType.Close, TourButtonType.Next],
    title: "Welcome to Conway's Game of Life!",
    text: ['This short introduction should help you with some basics of this game.'],
    position: 'bottom-right',
  },
  {
    id: TourStepID.Instruction,
    buttons: [TourButtonType.Close, TourButtonType.Back, TourButtonType.Next],
    title: 'Instruction',
    text: ['Here you can read about rules of evolution.'],
    position: 'bottom-left',
  },
  {
    id: TourStepID.Settings,
    buttons: [TourButtonType.Close, TourButtonType.Back, TourButtonType.Next],
    title: 'Settings',
    text: ['Here you can set size of the board and time between two iterations.'],
    position: 'bottom-left',
  },
  {
    id: TourStepID.PatternsLibrary,
    buttons: [TourButtonType.Close, TourButtonType.Back, TourButtonType.Next],
    title: 'Patterns library',
    text: [
      'Library that contains many patterns grouped by type.',
      'Select any of them and apply it anywhere on the board.',
    ],
  },
  {
    id: TourStepID.RandomPopulation,
    buttons: [TourButtonType.Close, TourButtonType.Back, TourButtonType.Next],
    title: 'Generate random population',
    text: ['Just a random population generator.'],
  },
  {
    id: TourStepID.ClearBoard,
    buttons: [TourButtonType.Close, TourButtonType.Back, TourButtonType.Next],
    title: 'Clear board',
    text: ['Clear board in a single click.'],
  },
  {
    id: TourStepID.Start,
    buttons: [TourButtonType.Back, TourButtonType.Finish],
    title: 'Start the game',
    text: ['Now you are ready to start!'],
  },
];
