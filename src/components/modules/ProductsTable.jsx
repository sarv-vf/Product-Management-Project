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

