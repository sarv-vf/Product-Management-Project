import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../helper/helper";
import { toast, Toaster } from "react-hot-toast";
import api from "../services/config";

import "@fontsource/vazirmatn";
import logo from "../assets/Union.svg";
import styles from "./Form.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const input = useRef(null);
  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("لطفا نام کاربری و رمز عبور را وارد کنید");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        username: username,
        password: password,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      toast.success("ورود با موفقیت انجام شد!");

      setTimeout(() => {
        navigate("/product-list");
      }, 1000);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
      } else if (err.response?.status === 404) {
        toast.error("کاربری با این مشخصات یافت نشد");
      } else if (err.code === "ERR_NETWORK") {
        toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("خطا در ورود. لطفاً دوباره تلاش کنید");
      }
    }
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  useTitle("Login Form");

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className={styles.bootCamp}>بوت کمپ بوتو استارت</h1>
      <div className={styles.login}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1 className={styles.formTitle}>فرم ورود</h1>

        <form onSubmit={clickHandler}>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={input}
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

export default LoginForm;
