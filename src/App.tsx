import { useState } from "react";
import { Settings } from "@/features/settings";
import { Grid } from "@/features/grid";
import { GameStatus } from "@/utils/constants";
import styles from "./App.module.css";
import { Provider } from "react-redux";
import { store } from "@/store";

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PAUSED);

  function toggleGameStatus() {
    setGameStatus(
      gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED
    );
  }

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <div className={styles["header"]}>
          <button
            className={styles["button"]}
            onClick={() => toggleGameStatus()}
          >
            {gameStatus === GameStatus.PAUSED ? `Start ▶️` : `Pause ⏸️`}
          </button>
          <Settings />
        </div>
        <Grid status={gameStatus} />
      </div>
    </Provider>
  );
}

export default App;
