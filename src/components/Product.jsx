import React from "react";
import PropTypes from "prop-types";

import "../styles/Product.scss";

const Product = ({ id, priority, production, onChanged, onDelete }) => (
  <div className="product">
    <div className="product-line">
      <p className="product-name">{`Изделие № ${id + 1}`}</p>
      <i className="fa fa-times" onClick={() => onDelete(id)} />
    </div>
    <div className="product-body">
      <p className="product-line">
        <label className="body-label">Годовой выпуск: </label>
        <input
          type="text"
          className="body-value"
          onChange={
            onChanged &&
            (e => onChanged(id, "production", e.currentTarget.value))
          }
          value={production}
        />
      </p>
      <p className="product-line">
        <label className="body-label">Приоритет: </label>
        <input
          type="text"
          className="body-value"
          onChange={
            onChanged && (e => onChanged(id, "priority", e.currentTarget.value))
          }
          value={priority}
        />
      </p>
    </div>
  </div>
);

Product.propTypes = {
  id: PropTypes.number.isRequired,
  priority: PropTypes.number.isRequired,
  production: PropTypes.number.isRequired,
  onChanged: PropTypes.func
};

export default Product;
