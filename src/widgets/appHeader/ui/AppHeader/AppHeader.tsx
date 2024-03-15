import classnames from 'classnames/bind';

import { SettingsMenu } from '@/entities/settings';
import { PatternsDrawer } from '@/features/selectPattern';
import { Instruction } from '@/widgets/instruction';

import { ClearBoardButton } from '../ClearBoardButton/ClearBoardButton';
import { GameStatusButton } from '../GameStatusButton/GameStatusButton';
import { GenerationsCounter } from '../GenerationsCounter/GenerationsCounter';
import { GoBackwardButton } from '../GoBackwardButton/GoBackwardButton';
import { InitRandomlyButton } from '../InitRandomlyButton/InitRandomlyButton';
import styles from './AppHeader.module.scss';
const cx = classnames.bind(styles);

export function AppHeader() {
  return (
    <div className={cx(['app-header'])}>
      <span className={cx(['app-header__title'])}>Conway&apos;s Game of Life</span>
      <div className={cx(['app-header-controls'])}>
        <GenerationsCounter />
        <GameStatusButton />
        <ClearBoardButton />
        <GoBackwardButton />
        <InitRandomlyButton />
        <PatternsDrawer />
        <SettingsMenu />
        <Instruction />
      </div>
    </div>
  );
}
