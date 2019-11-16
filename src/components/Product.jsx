import React from "react";

import "../styles/Product.scss";

const Product = ({ name, priority, annualProduction }) => (
  <div className="product">
    <div className="product-line">
      <p className="product-name">{name}</p>
      <i className="fa fa-times" />
    </div>
    <div className="product-body">
      <p className="product-line">
        <label className="body-label">Годовой выпуск: </label>
        <input type="text" className="body-value" value={annualProduction} />
      </p>
      <p className="product-line">
        <label className="body-label">Приоритет: </label>
        <input type="text" className="body-value" value={priority} />
      </p>
    </div>
  </div>
);

export default Product;
