import { Link } from "react-router-dom";

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) {
    return null;
  }

  return (
    <div className="quick-view-backdrop" role="presentation" onClick={onClose}>
      <div
        aria-modal="true"
        className="quick-view-modal"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close quick view"
          className="btn-close modal-close"
          onClick={onClose}
          type="button"
        />
        <div className="row p-0 m-0">
          <div className="col-lg-7 col-md-6">
            <img
              alt={product.name}
              className="image-modal"
              src={product.image}
            />
          </div>
          <div className="col-lg-5 col-md-6">
            <h4>{product.name}</h4>
            <p>
              <span className="badge bg-success">${product.price}</span> for
              sale
            </p>
            <p>{product.description}</p>
            <div className="qty-control my-3">
              <button type="button">-</button>
              <input readOnly type="text" value="1" />
              <button type="button">+</button>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(product)}
              type="button"
            >
              Add to cart
            </button>
            <div className="mt-2">
              <Link
                className="opacity-75 text-danger"
                onClick={onClose}
                to={`/product/${product.id}`}
              >
                View product detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
