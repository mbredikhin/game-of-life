import classnames from 'classnames/bind';

import { Instruction } from '@/widgets/instruction';

import styles from './InstructionPage.module.scss';
const cx = classnames.bind(styles);

function InstructionPage() {
  return (
    <div className={cx(['instruction-page'])}>
      <Instruction />
    </div>
  );
}

export default InstructionPage;
