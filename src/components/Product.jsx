import React from "react";
import PropTypes from "prop-types";

import "../styles/Product.scss";

const Product = ({ name, priority, production, onChanged }) => (
  <div className="product">
    <div className="product-line">
      <p className="product-name">{name}</p>
      <i className="fa fa-times" />
    </div>
    <div className="product-body">
      <p className="product-line">
        <label className="body-label">Годовой выпуск: </label>
        <input
          type="text"
          className="body-value"
          onBlur={
            onChanged && (e => onChanged("production", e.currentTarget.value))
          }
          defaultValue={production}
        />
      </p>
      <p className="product-line">
        <label className="body-label">Приоритет: </label>
        <input
          type="text"
          className="body-value"
          onBlur={
            onChanged && (e => onChanged("priority", e.currentTarget.value))
          }
          defaultValue={priority}
        />
      </p>
    </div>
  </div>
);

Product.propTypes = {
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  production: PropTypes.number.isRequired,
  onChanged: PropTypes.func
};

export default Product;
