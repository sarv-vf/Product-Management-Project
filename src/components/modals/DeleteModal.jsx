import closeIcon from "../../assets/Close.svg";

import styles from "./DeleteModal.module.css";

function DeleteModal({ isOpen, onClose, onDelete, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeIconWrapper}>
          <img src={closeIcon} alt="close" />
        </div>
        <p className={styles.message}>آیا از حذف این محصول مطمئنید؟</p>

        <div className={styles.buttons}>
          <button
            onClick={onDelete}
            className={styles.deleteBtn}
            disabled={isLoading}
          >
            {isLoading ? "در حال حذف ..." : "حذف"}
          </button>
          <button
            onClick={onClose}
            className={styles.cancelBtn}
            disabled={isLoading}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
