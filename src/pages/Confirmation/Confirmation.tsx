import styles from "./Confirmation.module.scss";

const Confirmation = () => {
  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__text}>
        <h1 className={styles.confirmation__title}>Confirmation</h1>
        <ul className={styles.confirmation__list}>
          <li>1. Go to your mail</li>
          <li>2. Open the confirmation email</li>
          <li>
            {" "}
            3. Copy from the link line of such type: ".../activate/uid/token"
            link and insert it into the address bar
          </li>
        </ul>
        <div className={styles.maketungDepartments}>
          <div className={styles.maketingeam}>
            <div className={styles.nimationesta}></div>
            <div className={styles.paneatuConveg}>
              <h1>P</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Confirmation;
