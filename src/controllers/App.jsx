import "../styles/App.scss";

import React from "react";
import Product from "../components/Product";
import Resource from "../components/Resource";

const count = Math.ceil(Math.random() * 100);

// let products = [
//   { name: "Изделие № 1", production: 45.0, priority: 1 },
//   { name: "Изделие № 2", production: 40.0, priority: 2 }
// ];

class App extends React.PureComponent {
  state = {
    products: new Array(count).fill(0).map((v, i) => ({
      name: `Изделие № ${i}`,
      production: (Math.random() * 50).toFixed(2),
      priority: Math.ceil(Math.random() * 3)
    })),
    resources: [],
    currentList: "products"
  };

  render() {
    const { products, resources, currentList } = this.state;
    return (
      <div className="app">
        <div className="side-panel">
          <div className={`list list-${currentList}`}>
            <h2 className="list-header">
              {currentList === "products" ? "Изделия" : "Ресурсы"}
            </h2>
            <div className={`wrapper wrapper-${currentList}`}>
              {currentList === "products"
                ? products.map(v => Product(v))
                : resources.map(v => Resource(v))}
            </div>
          </div>
          <div className="options">
            <div
              className="option option-products"
              onClick={() => this.setState({ currentList: "products" })}
            >
              <i className="fa fa-list" />
            </div>
            <div
              className="option option-resources"
              onClick={() => this.setState({ currentList: "resources" })}
            >
              <i className="fa fa-book" />
            </div>
          </div>
        </div>
        <div className="content"></div>
      </div>
    );
  }
}

export default App;
