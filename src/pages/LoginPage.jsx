import { useState } from "react";
import styles from "./LoginPage.module.css";
import logo from "../assets/Union.svg";

import "@fontsource/vazirmatn";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("ورود:", { username, password });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.bootCamp}>بوت کمپ بوتو استارت</h1>
      <div className={styles.login}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1 className={styles.formTitle}>فرم ورود</h1>
        
        <form onSubmit={submitHandler} >
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            ورود
          </button>
        </form>

        <Link className={styles.link} to="/register">
          ایجاد حساب کاربری!
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
