import "../styles/App.scss";

import React from "react";
import Product from "../components/Product";

const products = [
  { name: "Изделие № 1", annualProduction: 45.0, priority: 1 },
  { name: "Изделие № 2", annualProduction: 40.0, priority: 2 }
];

const App = () => (
  <div className="app">
    <div className="product-list">
      <h2 className="section-header">Продукция</h2>
      <div className="product-wrapper">{products.map(v => Product(v))}</div>
    </div>
    <div className="product-list">
      <h2 className="section-header">Продукция</h2>
      <div className="product-wrapper">{products.map(v => Product(v))}</div>
    </div>
  </div>
);

export default App;
