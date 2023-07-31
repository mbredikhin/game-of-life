import type { TSettings } from "../../types";
import { MAX_GRID_SIZE } from "../../constants";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import styles from "./Settings.module.css";

type SettingsProps = {
  settings: TSettings;
  changeSettings: (settings: TSettings) => void;
};

export const Settings = ({ settings, changeSettings }: SettingsProps) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(dropdownRef, () => setDisplayDropdown(false));

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setDisplayDropdown((value) => !value)}
      >
        <Cog6ToothIcon className="h-6 w-6 text-white-500" />
      </button>

      {displayDropdown ? (
        <div ref={dropdownRef} className={styles.form}>
          <label className="flex flex-col py-2">
            <span className={styles.label}>Grid height</span>
            <input
              className={styles.input}
              type="number"
              min={0}
              max={MAX_GRID_SIZE.height}
              value={settings.grid.height}
              onChange={(event) =>
                changeSettings({
                  ...settings,
                  grid: { ...settings.grid, height: +event.target.value },
                })
              }
            />
          </label>
          <label className="flex flex-col py-2">
            <span className={styles.label}>Grid width</span>
            <input
              className={styles.input}
              type="number"
              min={0}
              max={MAX_GRID_SIZE.width}
              value={settings.grid.width}
              onChange={(event) =>
                changeSettings({
                  ...settings,
                  grid: { ...settings.grid, width: +event.target.value },
                })
              }
            />
          </label>
          <label className="flex flex-col py-2">
            <span className={styles.label}>Tick time</span>
            <input
              className={styles.input}
              type="number"
              min={0}
              value={settings.tick}
              onChange={(event) =>
                changeSettings({
                  ...settings,
                  tick: +event.target.value,
                })
              }
            />
          </label>
        </div>
      ) : null}
    </div>
  );
};
