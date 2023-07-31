import { Settings } from "@/features/settings";
import { GameStatus, Grid } from "@/features/grid";
import { useState } from "react";
import { DEFAULT_SETTINGS } from "./features/settings";
import styles from "./App.module.css";

export const GAME_STATUSES: Record<GameStatus, GameStatus> = {
  PLAY: "PLAY",
  PAUSED: "PAUSED",
};

function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GAME_STATUSES.PAUSED
  );

  return (
    <div className={styles.app}>
      <Grid status={gameStatus} settings={settings} />
      <div className={styles["sidebar"]}>
        <button
          className={styles["sidebar__button"]}
          onClick={() =>
            setGameStatus(
              gameStatus === GAME_STATUSES.PAUSED
                ? GAME_STATUSES.PLAY
                : GAME_STATUSES.PAUSED
            )
          }
        >
          {gameStatus === GAME_STATUSES.PAUSED ? `Start ▶️` : `Pause ⏸️`}
        </button>
        <Settings settings={settings} changeSettings={setSettings} />
      </div>
    </div>
  );
}

export default App;
