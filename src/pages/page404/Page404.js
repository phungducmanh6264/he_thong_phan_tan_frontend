import styles from "./styles.module.scss";

function Page404() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContent}>
        <span className={styles.content}>404 not found</span>
      </div>
    </div>
  );
}

export default Page404;
