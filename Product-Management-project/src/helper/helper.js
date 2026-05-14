import { useEffect, useState } from "react";

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

const useResponsiveLimit = () => {
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const updateLimit = () => {
      const height = window.innerHeight;
      if (height < 640) setLimit(5);
      else if (height < 1024) setLimit(6);
      else setLimit(10);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  return limit;
};

export { useTitle, filterProductsBySearch , useResponsiveLimit};
