import { Menu } from '@/components/Menu';
import { IPreset } from '../../types';
import { Preset } from '../Preset';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import styles from './PresetsMenu.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectPreset } from '@/features/grid/slice';

export const PresetsMenu = () => {
  const { selectedPreset } = useAppSelector((state) => state.gridState);
  const dispatch = useAppDispatch();

  const presets: IPreset[] = [
    {
      name: 'Test preset #1',
      grid: [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ],
    },
    {
      name: 'Test preset #2',
      grid: [
        [false, true, false],
        [true, false, true],
        [false, true, false],
      ],
    },
    {
      name: 'Test preset #3',
      grid: [
        [true, false, true, false],
        [false, true, false, true],
        [true, false, true, false],
        [false, true, false, true],
      ],
    },
    {
      name: 'Test preset #4',
      grid: [
        [false, true, false, true],
        [true, false, true, false],
        [false, true, false, true],
        [true, false, true, false],
      ],
    },
  ];

  const activator = (
    <button className="button">
      <InformationCircleIcon className="button__icon" />
    </button>
  );
  const content = (
    <>
      <span className={styles['title']}>You can select any preset and place it on board</span>
      <div className={styles['presets']}>
        {presets.map((preset) => (
          <Preset
            key={preset.name}
            {...preset}
            isSelected={Boolean(selectedPreset && selectedPreset.name === preset.name)}
            select={() => dispatch(selectPreset(preset))}
          />
        ))}
      </div>
    </>
  );
  return <Menu activator={activator} content={content}></Menu>;
};
