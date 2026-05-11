import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

 const filterProductsBySearch = (products, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === "") {
    return products;
  }
  
  const lowerCaseSearch = searchTerm.toLowerCase().trim();
  
  return products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(lowerCaseSearch) ||
      product.id?.toLowerCase().includes(lowerCaseSearch)
    );
  });
};

export { useTitle, filterProductsBySearch };
