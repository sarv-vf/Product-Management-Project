import { useState } from "react";
import searchIcon from "../../assets/search.svg";
import styles from "./Search.module.css";

function Search({ onSearch }) {
  const [value, setValue] = useState("");

  const changeHandler = (e) => {
    const newValue = e.target.value;
        console.log("مقدار جستجو:", newValue);

    setValue(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchForm}>
          <img src={searchIcon} alt="search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={value}
            onChange={changeHandler}
            className={styles.searchInput}
          />
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}></div>
            <div className={styles.userText}>
              <span className={styles.userName}>میلاد عظمی</span>
              <span className={styles.userRole}>مدیر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;