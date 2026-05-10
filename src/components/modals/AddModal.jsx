import { useState } from "react";
import toast from "react-hot-toast";

import styles from "./AddModal.module.css";

function AddModal({ isOpen, onClose, onAdd, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  if (!isOpen) return null;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.price) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    await onAdd({
      name: formData.name,
      quantity: Number(formData.quantity),
      price: Number(FormData.price),
    });
    setFormData({ name: "", quantity: "", price: "" });
  };

  const closeHandler = () => {
    setFormData({ name: "", quantity: "", price: ""});
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
              value={formData.name}
              onChange={changeHandler}
              placeholder="نام کالا"
            />
          </div>

          <div className={styles.formGroup}>
            <label>تعداد موجودی</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={changeHandler}
              placeholder="تعداد"
            />
          </div>

          <div className={styles.formGroup}>
            <label>قیمت</label>
            <input
              type="text"
              name="price"
              value={formData.price}
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
