import clsx from "clsx";
import styles from "./Cell.module.css";

type CellProps = {
  isPopulated: boolean;
  corner?: "lt" | "rt" | "lb" | "rb";
  changeState: (isPopulated: boolean) => void;
};

export const Cell = ({ isPopulated, corner, changeState }: CellProps) => {
  return (
    <div
      className={clsx([
        styles.cell,
        isPopulated && styles["cell--filled"],
        corner !== null && styles[`cell--rounded-${corner}`],
      ])}
      onClick={() => changeState(!isPopulated)}
    ></div>
  );
};
