import "../styles/App.scss";

import React from "react";
import Product from "../components/Product";

class App extends React.PureComponent {
  state = {
    products: [
      { id: 0, production: 45.0, priority: 1 },
      { id: 1, production: 40.0, priority: 2 }
    ],
    resources: 3,
    periods: 2,
    resourceConsumption: [
      [2, 5, 5],
      [4, 4, 2]
    ],
    fonds: [
      [100, 200, 300],
      [200, 300, 400]
    ],
    mvp: [
      [2, 3],
      [4, 5]
    ]
  };

  productChanged = (id, property, newValue) => {
    if (/^\d+(\.\d+)*$/.test(newValue)) {
      this.setState(state => ({
        ...state,
        products: [
          ...state.products.slice(0, id),
          {
            ...state.products[id],
            [property]: Number(newValue)
          },
          ...state.products.slice(id + 1)
        ]
      }));
    }
  };

  deleteProduct = id =>
    this.setState(state => ({
      ...state,
      products: [
        ...state.products.slice(0, id),
        ...state.products.slice(id + 1)
      ]
    }));

  resourcesChanged = e => {
    const newValue = Number(e.currentTarget.value);
    if (newValue < 1) {
      return this.setState({ resources: 1 });
    }
    this.setState({ resources: newValue });
  };

  periodsChanged = e => {
    const newValue = Number(e.currentTarget.value);
    if (newValue < 1) {
      return this.setState({ periods: 1 });
    }
    this.setState({ periods: newValue });
  };

  render() {
    const {
      products,
      resources,
      currentList,
      periods,
      fonds,
      resourceConsumption,
      mvp
    } = this.state;
    return (
      <div className="app">
        <div className="side-panel">
          <div className="block">
            <p className="block-header">Количество ресурсов</p>
            <input
              type="number"
              className="block-input"
              onChange={this.resourcesChanged}
              value={resources}
            />
          </div>
          <div className="block">
            <p className="block-header">Количество периодов</p>
            <input
              type="number"
              className="block-input"
              onChange={this.periodsChanged}
              value={periods}
            />
          </div>
          <div className="list">
            <h2 className="list-header">Изделия</h2>
            <div className={`wrapper wrapper-${currentList}`}>
              {products.map(v => (
                <Product
                  key={`product-${v.id}`}
                  onChanged={this.productChanged}
                  onDelete={this.deleteProduct}
                  {...v}
                />
              ))}
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
                  <th colSpan={resources}>Ресурсы</th>
                </tr>
                <tr>
                  <th colSpan={1}>Изделия</th>
                  {Array(resources)
                    .fill(0)
                    .map((v, i) => (
                      <th key={`consumption-header-${i}`}>{i + 1}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {resourceConsumption.map((row, i) => {
                  return (
                    <tr key={`consumption-row-${i}`}>
                      <th>{i + 1}</th>
                      {row.map((col, j) => (
                        <td key={`consumption-col-${j}`}>
                          <input
                            className="table-input"
                            type="number"
                            step="0.1"
                            defaultValue={col}
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
                  <th colSpan={resources}>Ресурсы</th>
                </tr>
                <tr>
                  <th>Период</th>
                  {Array(resources)
                    .fill(0)
                    .map((v, i) => (
                      <th key={`fonds-header-${i}`}>{i + 1}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {fonds.map((row, i) => (
                  <tr key={`fonds-row-${i}`}>
                    <th>{i + 1}</th>
                    {row.map((col, j) => (
                      <td key={`fonds-col-${j}`}>
                        <input
                          className="table-input"
                          type="number"
                          step="0.1"
                          defaultValue={col}
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
                  <th colSpan={products.length}>Изделия</th>
                </tr>
                <tr>
                  <th>Период</th>
                  {products.map((v, i) => (
                    <th key={`parties-header-${i}`}>{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mvp.map((row, i) => (
                  <tr key={`parties-row-${i}`}>
                    <th>{i + 1}</th>
                    {row.map((col, j) => (
                      <td key={`parties-col-${j}`}>
                        <input
                          type="number"
                          className="table-input"
                          defaultValue={col}
                        />
                      </td>
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
