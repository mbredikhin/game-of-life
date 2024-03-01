import { useState } from 'react';

import { Grid } from '@/entities/grid';
import { ZoomControls, ZoomLevel } from '@/features/board/zoom';
import { useStorage } from '@/shared/hooks';

import styles from './Board.module.scss';

const zoomStorageKey = 'boardZoom';

export function Board() {
  const { getFromStorage, setToStorage } = useStorage(window.localStorage);
  const [zoom, setZoom] = useState<ZoomLevel>(getFromStorage(zoomStorageKey) ?? 'sm');

  function changeZoom(zoom: ZoomLevel) {
    setZoom(zoom);
    setToStorage(zoomStorageKey, zoom);
  }

  return (
    <div className={styles['board']}>
      <Grid zoom={zoom} />
      <ZoomControls zoom={zoom} onChangeZoom={changeZoom} />
    </div>
  );
}
