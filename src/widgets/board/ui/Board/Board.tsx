import { useState } from 'react';

import { Grid } from '@/entities/grid';
import { ZoomControls, ZoomLevel } from '@/features/board/zoom';

import styles from './Board.module.scss';

export function Board() {
  const [zoom, setZoom] = useState<ZoomLevel>('md');

  return (
    <div className={styles['board']}>
      <Grid zoom={zoom} />
      <ZoomControls zoom={zoom} onChangeZoom={setZoom} />
    </div>
  );
}
