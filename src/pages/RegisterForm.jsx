import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Union.svg";

import "@fontsource/vazirmatn";
import styles from "./Form.module.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("ورود:", { username, password });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.bootCamp}>بوت کمپ بوتو استارت</h1>
      <div className={styles.login}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1 className={styles.formTitle}>فرم ثبت نام</h1>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="password" placeholder="رمز عبور" />
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/product-list">
            <button type="submit" className={styles.button}>
             ثبت نام
            </button>
          </Link>
        </form>

        <Link className={styles.link} to="/login">
          حساب کاربری دارید؟
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
