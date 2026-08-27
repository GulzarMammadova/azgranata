import styles from "../Brands.module.scss";

export default function BrandsHeader() {
  return (
    <div className={styles.heading}>
        <div className={styles.sectionTitle}>
          <span className={styles.number}>02</span>
          <span className={styles.line} />
          <span className={styles.label}>Our Brands</span>
        </div>

      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>
          Crafted 
          <span>with Purpose</span>
        </h2>
      <div className={styles.description}>
        Every brand in the AZGRANATA family carries
        its own identity, history and philosophy
        united by uncompromising quality.
      </div>
      </div>

      </div> 
  );
}