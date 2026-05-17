import { Link } from "react-router-dom";

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  return (
    <div className="col-lg-4 col-md-6 col-6 mb-4 product">
      <article className="card shadow bg-body rounded">
        <img alt={product.name} className="rounded-1" src={product.image} />
        <div className="card-body p-4">
          <h5>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h5>
          <div className="price-line">
            <del className="badge bg-danger">${product.oldPrice}</del>
            <span className="badge bg-success">${product.price}</span>
          </div>
          <div className="detail d-flex justify-content-center align-items-center">
            <button
              aria-label="Quick view"
              onClick={() => onQuickView(product)}
              type="button"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <button aria-label="Favorite" type="button">
              <i className="fa-solid fa-heart" />
            </button>
            <button
              aria-label="Add to cart"
              onClick={() => onAddToCart(product)}
              type="button"
            >
              <i className="fa-solid fa-cart-shopping" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
