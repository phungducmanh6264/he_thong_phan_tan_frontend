import { Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";

function WaittingPanel({ content }) {
  return (
    <div className={styles.cpnWrapper}>
      <div className={styles.cpnContent}>
        <Spinner />
        <span>{content}</span>
      </div>
    </div>
  );
}

export default WaittingPanel;
