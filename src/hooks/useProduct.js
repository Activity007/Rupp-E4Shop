import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/productsApi";


export default function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setLoading(true);
      const nextProducts = await fetchProducts();

      if (isActive) {
        setProducts(nextProducts);
        setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    if (!category) {
      return products;
    }

    return products.filter((product) => product.category === category);
  }, [category, products]);

  return { loading, products, visibleProducts };
}
