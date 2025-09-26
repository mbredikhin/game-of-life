import classnames from 'classnames/bind';
import { useCallback } from 'react';

import { useKeymap } from '@/shared/hooks';
import { clamp } from '@/shared/lib';
import { Tooltip } from '@/shared/ui';

import { ZoomDelta } from '../../lib';
import styles from './ZoomControls.module.scss';
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

  const zoomInTooltipContent = (
    <span className="shortcut">
      Zoom In
      <span className="flex gap-1">
        <kbd>shift</kbd>
        <kbd>+</kbd>
      </span>
    </span>
  );

  const zoomOutTooltipContent = (
    <span className="shortcut">
      Zoom Out
      <span className="flex gap-1">
        <kbd>shift</kbd>
        <kbd>-</kbd>
      </span>
    </span>
  );

  return (
    <div className={cx(['zoom-controls'])}>
      <Tooltip
        position="left"
        content={zoomInTooltipContent}
        activator={
          <button className="button" onClick={() => changeZoom(ZoomDelta.Up)}>
            +
          </button>
        }
      />
      <Tooltip
        position="left"
        content={zoomOutTooltipContent}
        activator={
          <button className="button" onClick={() => changeZoom(ZoomDelta.Down)}>
            -
          </button>
        }
      />
    </div>
  );
}
