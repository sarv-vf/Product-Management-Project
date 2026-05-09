import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import api from "../services/config";
import Search from "../components/modules/Search";
import Pagination from "../components/modules/Pagination";
import ProductsTable from "../components/modules/ProductsTable";

import styles from "./ProductListPage.module.css";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/products?page=${currentPage}&limit=10`);
        console.log("پاسخ", response.data);
        setProducts(response.data || []);
        if (response.totalPages) {
          setTotalPages(response.totalPages);
        } else if (response.data.length < 4 && currentPage === 1) {
          setTotalPages(1);
        } else {
          setTotalPages(3);
        }
      } catch (error) {
        toast.error("خطا در دریافت محصولات");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const deleteHandler = async (id) => {
    if (window.confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((p) => p.id !== id));
        toast.success("محصول با موفقیت حذف شد");
      } catch (error) {
        toast.error("خطا در حذف محصول");
      }
    }
  };

  const editHandler = (product) => {
    console.log("ویرایش:", product);
    toast.success(`ویرایش ${product.name}`);
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pageContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      <Search />
      <div className={styles.header}>
        <h1 className={styles.title}>مدیریت کالا</h1>
      </div>

      <div className={styles.tableWrapper}>
        <ProductsTable
          products={products}
          isLoading={isLoading}
          onEdit={editHandler}
          onDelete={deleteHandler}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={pageChangeHandler}
      />
    </div>
  );
}

export default ProductListPage;
