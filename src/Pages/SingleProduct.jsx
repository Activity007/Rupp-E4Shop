import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";

export default function SingleProduct({
  loading,
  onAddToCart,
  onQuickView,
  products,
}) {
  const { productId } = useParams();
  const product =
    products.find((item) => String(item.id) === String(productId)) ||
    products[0];
  const relatedProducts = product
    ? products
        .filter(
          (item) =>
            item.category === product.category && item.id !== product.id,
        )
        .slice(0, 4)
    : [];

  if (loading) {
    return <p className="empty-state">Loading product detail from API...</p>;
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <p className="empty-state">Product not found.</p>
        <Link className="btn btn-primary" to="/">
          Back home
        </Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : [product.image, product.image, product.image];

  return (
    <div className="container mt-4">
      <section className="row p-3 m-0 product-detail">
        <div className="col-lg-5 p-0 m-0 shadow-sm">
          <div
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
            id="productCarousel"
          >
            <div className="carousel-inner carousel-customize">
              {images.slice(0, 4).map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="4000"
                  key={`${image}-${index}`}
                >
                  <img
                    alt={`${product.name} ${index + 1}`}
                    className="d-block w-100"
                    src={image}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              data-bs-slide="prev"
              data-bs-target="#productCarousel"
              type="button"
            >
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              data-bs-slide="next"
              data-bs-target="#productCarousel"
              type="button"
            >
              <span aria-hidden="true" className="carousel-control-next-icon" />
            </button>
          </div>
          <div className="row p-2 m-0 mt-3">
            {images.slice(0, 4).map((image, index) => (
              <button
                className="col-3 small-product"
                data-bs-slide-to={index}
                data-bs-target="#productCarousel"
                key={`${image}-${index}`}
                type="button"
              >
                <img
                  alt={`${product.name} thumbnail ${index + 1}`}
                  src={image}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card border-0 rounded-0 shadow-sm p-3 product-info">
            <h4>{product.name}</h4>
            <p>
              <span className="badge bg-success">${product.price}</span> for
              sale
            </p>
            <p>{product.description}</p>
            <div className="d-flex align-items-center my-3">
              <h5>Quantity:</h5>
              <div className="qty-control my-2 mx-4">
                <button type="button">-</button>
                <input readOnly type="text" value="1" />
                <button type="button">+</button>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <h5 className="opacity-75">Color:</h5>
              <div className="row p-0 ps-3">
                {product.colors.map((color) => (
                  <span
                    className="color"
                    key={color}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <h5 className="opacity-75">Category:</h5>
              <p className="ms-4 mt-3 text-capitalize">{product.category}</p>
            </div>
            <div className="d-flex align-items-center">
              <h5 className="opacity-75">Brand:</h5>
              <p className="ms-4 mt-3">{product.brand}</p>
            </div>
            <button
              className="btn btn-primary detail-add-cart"
              onClick={() => onAddToCart(product)}
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      <section className="all-product my-5">
        <h2 className="text-center mb-5">
          <u>Related products</u>
        </h2>
        <ProductGrid
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          products={relatedProducts}
        />
      </section>
    </div>
  );
}
