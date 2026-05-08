import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Loader from "../Loader";
import styles from "./ProductsTable.module.css";
function ProductsTable({ products, isLoading, onEdit, onDelete }) {
  console.log(products);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thName}>نام کالا</th>
              <th className={styles.thStock}>موجودی</th>
              <th className={styles.thPrice}>قیمت</th>
              <th className={styles.thId}>شناسه کالا</th>
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
      <td className={styles.tdPrice}>{price?.toLocaleString() || price}</td>
      <td className={styles.tdId}>{id}</td>
      <td className={styles.tdActions}>
        <button
          onClick={() => onEdit(product)}
          className={`${styles.action} ${styles.edit}`}
          title="ویرایش"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(id)}
          className={`${styles.action} ${styles.delete}`}
          title="حذف"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};
