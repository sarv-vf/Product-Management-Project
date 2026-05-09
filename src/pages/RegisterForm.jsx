import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../helper/helper";
import { toast, Toaster } from "react-hot-toast";
import api from "../services/config";

import logo from "../assets/Union.svg";
import "@fontsource/vazirmatn";
import styles from "./Form.module.css";

function RegisterForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const input = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("لطفا نام کاربری و رمز عبور را وارد کنید");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    try {
      await api.post("/auth/register", {
        username: username,
        password: password,
      });

      toast.success("ثبت نام با موفقیت انجام شد!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("این نام کاربری قبلاً ثبت شده است");
      } else if (err.response?.status === 400) {
        toast.error(
          err.response?.data?.message || "اطلاعات وارد شده صحیح نیست",
        );
      } else if (err.code === "ERR_NETWORK") {
        toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید");
      } else {
        toast.error("خطا در ثبت نام. لطفاً دوباره تلاش کنید");
      }
    }
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  useTitle("Register Form");

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
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
            ref={input}
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.formInput}
          />

          <button type="submit" className={styles.button}>
            ثبت نام
          </button>
        </form>

        <Link className={styles.link} to="/login">
          حساب کاربری دارید؟
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
