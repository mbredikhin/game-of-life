import { useRef, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useOnClickOutside, useAppDispatch, useAppSelector } from "@/hooks";
import { MAX_GRID_SIZE, updateSettings } from "../../slice";
import styles from "./Settings.module.css";

export const Settings = () => {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  useOnClickOutside(dropdownRef, () => setIsDropdownExpanded(false));

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsDropdownExpanded((value) => !value)}
      >
        <Cog6ToothIcon className="h-6 w-6 text-white-500" />
      </button>

      {isDropdownExpanded ? (
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
                dispatch(
                  updateSettings({
                    grid: {
                      ...settings.grid,
                      height: +event.target.value,
                    },
                  })
                )
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
                dispatch(
                  updateSettings({
                    grid: {
                      ...settings.grid,
                      width: +event.target.value,
                    },
                  })
                )
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
                dispatch(
                  updateSettings({
                    tick: +event.target.value,
                  })
                )
              }
            />
          </label>
        </div>
      ) : null}
    </div>
  );
};
