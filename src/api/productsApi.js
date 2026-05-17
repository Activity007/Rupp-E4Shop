import { fallbackProducts } from "../data/product";


const API_URL =
  import.meta.env.VITE_PRODUCTS_API_URL ||
  "https://dummyjson.com/products?limit=12";

function getCategory(title = "", sourceCategory = "") {
  const text = `${title} ${sourceCategory}`.toLowerCase();

  if (
    text.includes("phone") ||
    text.includes("iphone") ||
    text.includes("smartphone")
  ) {
    return "phone";
  }

  if (
    text.includes("laptop") ||
    text.includes("computer") ||
    text.includes("macbook") ||
    text.includes("desktop")
  ) {
    return "computer";
  }

  if (text.includes("watch")) {
    return "watch";
  }

  return sourceCategory || "other";
}

function normalizeApiProduct(product) {
  const price = Math.round(Number(product.price || 0));
  const discount = Number(product.discountPercentage || 0);
  const oldPrice =
    discount > 0 ? Math.round(price / (1 - discount / 100)) : price + 100;

  return {
    id: `api-${product.id}`,
    name: product.title,
    category: getCategory(product.title, product.category),
    brand: product.brand || "Store Brand",
    price,
    oldPrice,
    image: product.thumbnail || product.images?.[0],
    images: product.images || [product.thumbnail],
    description: product.description || "Product details are coming soon.",
    colors: ["#111827", "#64748b", "#d97706"],
  };
}

export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Product API failed with status ${response.status}`);
    }

    const data = await response.json();
    const products = Array.isArray(data) ? data : data.products;

    if (!Array.isArray(products) || products.length === 0) {
      return fallbackProducts;
    }

    return [...products.map(normalizeApiProduct), ...fallbackProducts];
  } catch (error) {
    console.warn("Using local products because API fetch failed:", error);
    return fallbackProducts;
  }
}
