import classnames from 'classnames/bind';

import styles from './Switch.module.scss';
const cx = classnames.bind(styles);

interface SwitchProps {
  checked: boolean;
  label?: string | JSX.Element;
  onChange: (value: boolean) => void;
}

export function Switch({ checked, label = '', onChange }: SwitchProps) {
  return (
    <div className="switch">
      <input
        className={cx(['switch__input'])}
        type="checkbox"
        role="switch"
        id="switch"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <label className={cx(['switch__label'])} htmlFor="switch">
        {label}
      </label>
    </div>
  );
}
