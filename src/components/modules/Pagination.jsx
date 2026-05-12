import styles from "./Pagination.module.css";

function Pagination({ currentPage,totalPages, onPageChange }) {

  return (  
      <div className={styles.pagination}>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.active : ""}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
