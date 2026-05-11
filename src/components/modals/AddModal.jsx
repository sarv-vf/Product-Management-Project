import { useState } from "react";
import toast from "react-hot-toast";

import styles from "./AddModal.module.css";

function AddModal({ isOpen, onClose, onAdd, isLoading }) {
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  if (!isOpen) return null;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!productData.name || !productData.quantity || !productData.price) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }

      console.log("داده ارسالی به API:", productData);
    await onAdd({
      name: productData.name,
      quantity: Number(productData.quantity),
      price: Number(productData.price),
    });
    setProductData({ name: "", quantity: "", price: "" });
  };

  const closeHandler = () => {
    setProductData({ name: "", quantity: "", price: ""});
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={closeHandler}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>ایجاد محصول جدید</h2>

        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.formGroup}>
            <label>نام کالا</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={changeHandler}
              placeholder="نام کالا"
            />
          </div>

          <div className={styles.formGroup}>
            <label>تعداد موجودی</label>
            <input
              type="text"
              name="quantity"
              value={productData.quantity}
              onChange={changeHandler}
              placeholder="تعداد"
            />
          </div>

          <div className={styles.formGroup}>
            <label>قیمت</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={changeHandler}
              placeholder="قیمت"
            />
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={closeHandler}
              className={styles.cancelBtn}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "در حال ایجاد..." : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
