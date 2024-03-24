import classnames from 'classnames/bind';
import { useCallback, useEffect } from 'react';

import { Tooltip } from '@/shared/ui';

import { ZoomDirection, ZoomLevel, zoomLevels } from '../../lib';
import styles from './ZoomControls.module.scss';
const cx = classnames.bind(styles);

interface ZoomControls {
  zoom: ZoomLevel;
  onChangeZoom: (zoom: ZoomLevel) => void;
}

export function ZoomControls({ zoom, onChangeZoom }: ZoomControls) {
  const changeZoom = useCallback(
    (direction: ZoomDirection) => {
      const currentZoomLevel = zoomLevels.findIndex((level) => level === zoom);
      const value = zoomLevels[currentZoomLevel + direction];
      if (value) {
        onChangeZoom(value);
      }
    },
    [zoom, onChangeZoom],
  );

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey && event.code === 'Equal') {
        changeZoom(ZoomDirection.Up);
      } else if (event.shiftKey && event.code === 'Minus') {
        changeZoom(ZoomDirection.Down);
      }
    },
    [changeZoom],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

  return (
    <div className={cx(['zoom-controls'])}>
      <Tooltip position="left" text="Add zoom [shift +]">
        <button className="button" onClick={() => changeZoom(ZoomDirection.Up)}>
          +
        </button>
      </Tooltip>
      <Tooltip position="left" text="Reduce zoom [shift -]">
        <button className="button" onClick={() => changeZoom(ZoomDirection.Down)}>
          -
        </button>
      </Tooltip>
    </div>
  );
}
