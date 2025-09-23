import classnames from 'classnames/bind';
import { useCallback } from 'react';

import { Tooltip } from '@/shared/ui';

import { ZoomDelta } from '../../lib';
import styles from './ZoomControls.module.scss';
import { clamp } from '@/shared/lib';
import { useKeymap } from '@/shared/hooks';
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

  useKeymap({
    Equal: [
      {
        modifiers: ['shiftKey'],
        handler: () => changeZoom(ZoomDelta.Up),
      },
    ],
    Minus: [
      {
        modifiers: ['shiftKey'],
        handler: () => changeZoom(ZoomDelta.Down),
      },
    ],
  });

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
