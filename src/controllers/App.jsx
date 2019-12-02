import "../styles/App.scss";

import React from "react";
import Product from "../components/Product";
import Resource from "../components/Resource";

class App extends React.PureComponent {
  state = {
    products: [
      { name: "Изделие № 1", production: 45.0, priority: 1 },
      { name: "Изделие № 2", production: 40.0, priority: 2 }
    ],
    resources: [
      { name: "Изделие № 1", production: 45.0, priority: 1 },
      { name: "Изделие № 2", production: 40.0, priority: 2 }
    ],
    periods: 2,
    currentList: "products"
  };

  render() {
    const { products, resources, currentList, periods } = this.state;
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
        <div className="content">
          <div className="table-wrapper">
            <h2 className="content-header">
              Затраты ресурсов на единицу продукции
            </h2>
            <table className="table table-consumption">
              <thead>
                <tr>
                  <th></th>
                  <th colspan={resources.length}>Ресурсы</th>
                </tr>
                <tr>
                  <th colspan={1}>Изделия</th>
                  {resources.map((v, i) => (
                    <th key={`consumption-header-${i}`}>{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((row, i) => {
                  return (
                    <tr key={`consumption-row-${i}`}>
                      <th>{i + 1}</th>
                      {resources.map((col, j) => (
                        <td key={`consumption-col-${j}`}>
                          <input
                            className="table-input"
                            type="number"
                            step="0.1"
                            defaultValue={Math.random().toFixed(2)}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table-wrapper">
            <h2 className="content-header">Фонды ресурсов</h2>
            <table className="table table-fonds">
              <thead>
                <tr>
                  <th></th>
                  <th colspan={resources.length}>Ресурсы</th>
                </tr>
                <tr>
                  <th>Период</th>
                  {resources.map((v, i) => (
                    <th key={`fonds-header-${i}`}>{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {new Array(periods).fill(0).map((row, i) => (
                  <tr key={`fonds-row-${i}`}>
                    <th>{i + 1}</th>
                    {resources.map((v, j) => (
                      <td key={`fonds-col-${j}`}>
                        <input
                          className="table-input"
                          type="number"
                          step="0.1"
                          defaultValue={Math.random().toFixed(2)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-wrapper">
            <h2 className="content-header">
              Минимально необходимые партии продукции
            </h2>
            <table className="table parties-table">
              <thead>
                <tr>
                  <th></th>
                  <th colspan={products.length}>Изделия</th>
                </tr>
                <tr>
                  <th>Период</th>
                  {products.map((v, i) => (
                    <th className={`parties-header-${i}`}>{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {new Array(periods).fill(0).map((row, i) => (
                  <tr key={`parties-row-${i}`}>
                    {products.map((col, j) => (
                      <td key={`parties-col-${j}`}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
