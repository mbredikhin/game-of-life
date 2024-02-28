import { ZoomDirection, ZoomLevel, zoomLevels } from '../../lib';
import styles from './ZoomControls.module.scss';

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
    <div className={styles['zoom-controls']}>
      <button className="button" onClick={() => changeZoom(ZoomDirection.Up)}>
        +
      </button>
      <button className="button" onClick={() => changeZoom(ZoomDirection.Down)}>
        -
      </button>
    </div>
  );
}
