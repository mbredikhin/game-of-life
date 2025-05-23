import classnames from 'classnames/bind';
import { useMatch, useNavigate } from 'react-router-dom';

import { SettingsMenu } from '@/entities/settings';
import { PatternsDrawer } from '@/features/selectPattern';
import { TourPopup, TourStepID } from '@/features/tour';
import { RouteName } from '@/shared/config';

import { ClearBoardButton } from '../ClearBoardButton/ClearBoardButton';
import { GameStatusButton } from '../GameStatusButton/GameStatusButton';
import { GenerationsCounter } from '../GenerationsCounter/GenerationsCounter';
import { InitRandomlyButton } from '../InitRandomlyButton/InitRandomlyButton';
import { InstructionButton } from '../InstructionButton/InstructionButton';
import { StepBackButton } from '../StepBackButton/StepBackButton';
import styles from './AppHeader.module.scss';
const cx = classnames.bind(styles);

export function AppHeader() {
  const isHomePage = useMatch(RouteName.HOME_PAGE);
  const navigate = useNavigate();

  function onLogoClick() {
    if (!isHomePage) {
      navigate(RouteName.HOME_PAGE);
    }
  }

  return (
    <div className={cx(['app-header'])}>
      <TourPopup stepID={TourStepID.Initial}>
        <span
          className={cx({ 'app-header__title': true, 'app-header__title--link': !isHomePage })}
          onClick={onLogoClick}
        >
          Conway&apos;s Game of Life
        </span>
      </TourPopup>
      {isHomePage ? (
        <>
          <GenerationsCounter />
          <div className={cx(['app-header-controls'])}>
            <div className={cx(['app-header-controls__status-button'])}>
              <GameStatusButton />
            </div>
            <ClearBoardButton />
            <StepBackButton />
            <InitRandomlyButton />
            <PatternsDrawer />
            <SettingsMenu />
            <InstructionButton />
          </div>
        </>
      ) : null}
    </div>
  );
}
