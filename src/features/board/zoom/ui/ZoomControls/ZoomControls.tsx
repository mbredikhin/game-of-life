import classnames from 'classnames/bind';
import { useCallback, useEffect } from 'react';

import { Tooltip } from '@/shared/ui';

import { ZoomDelta } from '../../lib';
import styles from './ZoomControls.module.scss';
import { clamp } from '@/shared/lib';
const cx = classnames.bind(styles);

interface ZoomControls {
  zoom: number;
  onChangeZoom: (zoom: number) => void;
}

export function ZoomControls({ zoom, onChangeZoom }: ZoomControls) {
  const changeZoom = useCallback(
    (delta: ZoomDelta) => {
      onChangeZoom(clamp(zoom + delta, -5, 5));
    },
    [zoom, onChangeZoom],
  );

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey && event.code === 'Equal') {
        changeZoom(ZoomDelta.Up);
      } else if (event.shiftKey && event.code === 'Minus') {
        changeZoom(ZoomDelta.Down);
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
      <Tooltip
        position="left"
        content="Zoom In [shift +]"
        activator={
          <button className="button" onClick={() => changeZoom(ZoomDelta.Up)}>
            +
          </button>
        }
      />
      <Tooltip
        position="left"
        content="Zoom Out [shift -]"
        activator={
          <button className="button" onClick={() => changeZoom(ZoomDelta.Down)}>
            -
          </button>
        }
      />
    </div>
  );
}
