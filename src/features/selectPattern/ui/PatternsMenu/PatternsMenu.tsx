import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Pattern } from '@/entities/pattern';
import { selectPattern } from '@/entities/grid';
import { Menu } from '@/shared/ui';
import styles from './PatternsMenu.module.scss';
import { patternsRLE, decodeRLE } from '../../lib';

const patterns = patternsRLE.map((pattern) => ({ ...pattern, grid: decodeRLE(pattern.data) }));

export function PatternsMenu() {
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  const activator = (
    <button className="button">
      <BookOpenIcon className="button__icon" />
    </button>
  );
  const content = (
    <>
      <span className={styles['title']}>You can select any pattern and place it on board</span>
      <div className={styles['patterns']}>
        {patterns.map((pattern) => (
          <Pattern
            key={pattern.name}
            {...pattern}
            isSelected={Boolean(selectedPattern && selectedPattern.name === pattern.name)}
            select={() => dispatch(selectPattern(pattern))}
          />
        ))}
      </div>
    </>
  );
  return <Menu activator={activator} content={content}></Menu>;
}
