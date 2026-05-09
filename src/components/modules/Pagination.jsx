import styles from "./Pagination.module.css";

function Pagination({ currentPage, onPageChange }) {

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(1)}
        className={`${styles.pageBtn} ${currentPage === 1 ? styles.active : ""}`}
      >
        ۱
      </button>
      
      <button
        onClick={() => onPageChange(2)}
        className={`${styles.pageBtn} ${currentPage === 2 ? styles.active : ""}`}
      >
        ۲
      </button>
      
      <button
        onClick={() => onPageChange(3)}
        className={`${styles.pageBtn} ${currentPage === 3 ? styles.active : ""}`}
      >
        ۳
      </button>
    </div>
  );
}

export default Pagination;
