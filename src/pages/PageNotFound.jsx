import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        
        <h1 className={styles.title}>صفحه مورد نظر یافت نشد</h1>
        <p className={styles.message}>
         متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </p>
        <Link to="/login" className={styles.button}>
          بازگشت به صفحه ورود
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;