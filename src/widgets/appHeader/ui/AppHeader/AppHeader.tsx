import classnames from 'classnames/bind';
import { useMatch } from 'react-router-dom';

import { SettingsMenu } from '@/entities/settings';
import { PatternsDrawer } from '@/features/selectPattern';
import { TourPopup, TourStepID } from '@/features/tour';
import { RouteName } from '@/shared/config';

import { ClearBoardButton } from '../ClearBoardButton/ClearBoardButton';
import { GameStatusButton } from '../GameStatusButton/GameStatusButton';
import { GenerationsCounter } from '../GenerationsCounter/GenerationsCounter';
import { GoBackButton } from '../GoBackButton/GoBackButton';
import { InitRandomlyButton } from '../InitRandomlyButton/InitRandomlyButton';
import { InstructionButton } from '../InstructionButton/InstructionButton';
import { StepBackwardButton } from '../StepBackwardButton/StepBackwardButton';
import styles from './AppHeader.module.scss';
const cx = classnames.bind(styles);

export function AppHeader() {
  const isHomePage = useMatch(RouteName.HOME_PAGE);

  return (
    <div className={cx(['app-header'])}>
      <TourPopup stepID={TourStepID.Initial}>
        <span className={cx(['app-header__title'])}>Conway&apos;s Game of Life</span>
      </TourPopup>
      <div className={cx(['app-header-controls'])}>
        {isHomePage ? (
          <>
            <GenerationsCounter />
            <GameStatusButton />
            <ClearBoardButton />
            <StepBackwardButton />
            <InitRandomlyButton />
            <PatternsDrawer />
            <SettingsMenu />
            <InstructionButton />
          </>
        ) : (
          <GoBackButton />
        )}
      </div>
    </div>
  );
}
