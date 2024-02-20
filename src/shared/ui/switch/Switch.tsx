import styles from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  label?: string | JSX.Element;
  onChange: (value: boolean) => void;
}

export function Switch({ checked, label = '', onChange }: SwitchProps) {
  return (
    <div className="switch">
      <input
        className={styles['switch__input']}
        type="checkbox"
        role="switch"
        id="switch"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <label className={styles['switch__label']} htmlFor="switch">
        {label}
      </label>
    </div>
  );
}
