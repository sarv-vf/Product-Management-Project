import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import api from "../services/config";
import Search from "../components/modules/Search";
import Pagination from "../components/modules/Pagination";
import ProductsTable from "../components/modules/ProductsTable";
import AddModal from "../components/modals/AddModal";
import DeleteModal from "../components/modals/DeleteModal";
import {
  filterProductsBySearch,
  useResponsiveLimit,
  useTitle,
} from "../helper/helper";

import styles from "./ProductListPage.module.css";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const limit = useResponsiveLimit();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `/products?page=${currentPage}&limit=${limit}`,
        );
        console.log("پاسخ کامل API:", response);
        setProducts(response.data || []);
        setDisplayProducts(response.data || []);
        if (response.totalPages) {
          setTotalPages(response.totalPages);
        } else {
          setTotalPages(Math.ceil(response.data.length /limit));
        }
      } catch (error) {
        toast.error("خطا در دریافت محصولات");
        setProducts([]);
        setDisplayProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, limit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    const filtered = filterProductsBySearch(products, searchTerm);
    setDisplayProducts(filtered);
  }, [searchTerm, products]);

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const searchHandler = (term) => {
    setSearchTerm(term);
  };

  const addProductHandler = async (newProduct) => {
    setIsAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("لطفاً ابتدا وارد شوید");
        window.location.href = "/login";
        return;
      }
      await api.post("/products", newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const fetchResponse = await api.get(`/products?page=1&limit=${limit}`);
      setProducts(fetchResponse.data || []);
      setDisplayProducts(fetchResponse.data || []);
      setCurrentPage(1);

      if (fetchResponse.totalPages) {
        setTotalPages(fetchResponse.totalPages);
      }

      toast.success("محصول با موفقیت اضافه شد");
      setIsAddModalOpen(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error("خطا در افزودن محصول");
    } finally {
      setIsAdding(false);
    }
  };

  const editHandler = (product) => {
    setProductToEdit(product);
    setIsAddModalOpen(true);
  };

  const editProductHandler = async (id, updateProduct) => {
    setIsAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("لطفاً ابتدا وارد شوید");
        window.location.href = "/login";
        return;
      }

      await api.put(`/products/${id}`, updateProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.map((p) =>
        p.id === id ? { ...p, ...updateProduct } : p,
      );
      setProducts(updatedProducts);
      toast.success("محصول با موفقیت ویرایش شد");
      setIsAddModalOpen(false);
      setProductToEdit(null);
    } catch (error) {
      toast.error("خطا در ویرایش محصول");
    } finally {
      setIsAdding(false);
    }
  };

  const deleteHandler = async (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!selectedProduct) return;
    setIsDeleting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("لطفاً ابتدا وارد شوید");
        window.location.href = "/login";
        return;
      }

      await api.delete(`/products/${selectedProduct.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      toast.success("محصول با موفقیت حذف شد");
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error("خطا در حذف محصول");
    } finally {
      setIsDeleting(false);
    }
  };

  useTitle("Products List");
  return (
    <div className={styles.pageContainer}>
      <Toaster position="top-center" reverseOrder={false} />

      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setProductToEdit(null);
        }}
        onAdd={addProductHandler}
        onEdit={editProductHandler}
        isLoading={isAdding}
        productToEdit={productToEdit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onDelete={confirmDelete}
        productName={selectedProduct?.name}
        isLoading={isDeleting}
      />

      <Search onSearch={searchHandler} />

      <div className={styles.header}>
        <h1 className={styles.title}>مدیریت کالا</h1>
        <div className={styles.addButtonWrapper}>
          <button
            className={styles.addButton}
            onClick={() => {
              setIsAddModalOpen(true);
              setProductToEdit(null);
            }}
          >
            افزودن محصول
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <ProductsTable
          products={displayProducts}
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
