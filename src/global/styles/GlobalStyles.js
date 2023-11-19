import styles from "./styles.module.scss";

function Globalstyles({ children }) {
  return <div className={styles.globalStyles}>{children}</div>;
}

export default Globalstyles;
