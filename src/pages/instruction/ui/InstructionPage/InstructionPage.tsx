import classnames from 'classnames/bind';

import { Instruction } from '@/widgets/instruction';

import styles from './InstructionPage.module.scss';
const cx = classnames.bind(styles);

export function InstructionPage() {
  return (
    <div className={cx(['instruction-page'])}>
      <Instruction />
    </div>
  );
}
