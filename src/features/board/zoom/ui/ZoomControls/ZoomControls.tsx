import classnames from 'classnames/bind';

import { ZoomDirection, ZoomLevel, zoomLevels } from '../../lib';
import styles from './ZoomControls.module.scss';
const cx = classnames.bind(styles);

interface ZoomControls {
  zoom: ZoomLevel;
  onChangeZoom: (zoom: ZoomLevel) => void;
}

export function ZoomControls({ zoom, onChangeZoom }: ZoomControls) {
  function changeZoom(direction: ZoomDirection) {
    const currentZoomLevel = zoomLevels.findIndex((level) => level === zoom);
    const value = zoomLevels[currentZoomLevel + direction];
    if (value) {
      onChangeZoom(value);
    }
  }

  return (
    <div className={cx(['zoom-controls'])}>
      <button className="button" onClick={() => changeZoom(ZoomDirection.Up)}>
        +
      </button>
      <button className="button" onClick={() => changeZoom(ZoomDirection.Down)}>
        -
      </button>
    </div>
  );
}
