import { XMarkIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useEffect } from 'react';

import { resetGrid } from '@/entities/grid';
import { SettingsMenu } from '@/entities/settings';
import { PatternsDrawer } from '@/features/selectPattern';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';
import { Instruction } from '@/widgets/instruction';

import { GameStatusButton } from '../GameStatusButton/GameStatusButton';
import { GenerationsCounter } from '../GenerationsCounter/GenerationsCounter';
import { GoBackwardButton } from '../GoBackwardButton/GoBackwardButton';
import { InitRandomlyButton } from '../InitRandomlyButton/InitRandomlyButton';
import styles from './AppHeader.module.scss';
const cx = classnames.bind(styles);

export function AppHeader() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGrid(gridSettings));
  }, [gridSettings, dispatch]);

  return (
    <div className={cx(['app-header'])}>
      <span className={cx(['app-header__title'])}>Conway&apos;s Game of Life</span>
      <div className={cx(['app-header-controls'])}>
        <GenerationsCounter />
        <GameStatusButton />
        <InitRandomlyButton />
        <GoBackwardButton />
        <Tooltip text="Clear board" position="bottom">
          <button className="button" onClick={() => dispatch(resetGrid(gridSettings))}>
            <XMarkIcon className="button__icon" />
          </button>
        </Tooltip>
        <PatternsDrawer />
        <SettingsMenu />
        <Instruction />
      </div>
    </div>
  );
}
