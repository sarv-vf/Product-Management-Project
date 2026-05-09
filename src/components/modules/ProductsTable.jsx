import Loader from "../Loader";

import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";

import styles from "./ProductsTable.module.css";

function ProductsTable({ products, isLoading, onEdit, onDelete }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className={styles.emptyWrapper}>
          <div className={styles.emptyMessage}>
            <p>هیچ محصولی یافت نشد</p>
            <span>برای افزودن محصول جدید روی دکمه افزودن کلیک کنید</span>
          </div>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thName}>نام کالا</th>
              <th className={styles.thStock}>موجودی</th>
              <th className={styles.thPrice}>قیمت</th>
              <th className={styles.thId}>شناسه کالا</th>
              <th className={styles.thActions}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductsTable;

const TableRow = ({ product, onEdit, onDelete }) => {
  const { id, name, quantity, price } = product;
  return (
    <tr>
      <td className={styles.tdName}>{name}</td>
      <td className={styles.tdStock}>{quantity}</td>
      <td className={styles.tdPrice}>
        {price?.toLocaleString() || price} هزار تومان
      </td>
      <td className={styles.tdId}>
        {id ? `${id.slice(0, 8)}...${id.slice(-4)}` : "-"}
      </td>
      <td className={styles.tdActions}>
        <button
          onClick={() => onEdit(product)}
          className={`${styles.action} ${styles.edit}`}
          title="ویرایش"
        >
          <img src={edit} alt="editIcon" className={styles.icon} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className={`${styles.action} ${styles.delete}`}
          title="حذف"
        >
          <img src={trash} alt="trashIcon" className={styles.icon} />
        </button>
      </td>
    </tr>
  );
};
