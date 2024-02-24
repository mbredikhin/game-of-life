import { ZoomLevel, zoomLevels } from '../../lib';
import styles from './ZoomControls.module.scss';

interface ZoomControls {
  zoom: ZoomLevel;
  onChangeZoom: (zoom: ZoomLevel) => void;
}

export function ZoomControls({ zoom, onChangeZoom }: ZoomControls) {
  function changeZoom(delta: -1 | 1) {
    const currentZoomLevel = zoomLevels.findIndex((level) => level === zoom);
    const value = zoomLevels[currentZoomLevel + delta];
    if (value) {
      onChangeZoom(value);
    }
  }

  return (
    <div className={styles['zoom-controls']}>
      <button className="button" onClick={() => changeZoom(1)}>
        +
      </button>
      <button className="button" onClick={() => changeZoom(-1)}>
        -
      </button>
    </div>
  );
}
