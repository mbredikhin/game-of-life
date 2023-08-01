import { Settings } from "@/features/settings";
import { Grid } from "@/features/grid";
import { useState } from "react";
import { DEFAULT_SETTINGS } from "./features/settings";
import styles from "./App.module.css";
import { GameStatus } from "@/utils/constants";

function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PAUSED);

  function toggleGameStatus() {
    setGameStatus(
      gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles["header"]}>
        <button className={styles["button"]} onClick={() => toggleGameStatus()}>
          {gameStatus === GameStatus.PAUSED ? `Start ▶️` : `Pause ⏸️`}
        </button>
        <Settings settings={settings} changeSettings={setSettings} />
      </div>
      <Grid status={gameStatus} settings={settings} />
    </div>
  );
}

export default App;
