import "../styles/App.scss";

import React from "react";
import axios from "axios";
import Product from "../components/Product";
import TableComponent from "../components/TableComponent";

let host = "https://toau1.herokuapp.com";
if (process.env.NODE_ENV === "debug") host = "http://localhost:8000";

class App extends React.PureComponent {
  state = {
    products: [
      { id: 0, annual: 45.0, priority: 1 },
      { id: 1, annual: 40.0, priority: 2 }
    ],
    resourceCount: 3,
    periodsCount: 2,
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

  addProduct = () =>
    this.setState(state => ({
      products: [
        ...state.products,
        {
          id: state.products[state.products.length - 1].id + 1,
          annual: 0,
          priority: 1
        }
      ],
      resourceConsumption: [
        ...state.resourceConsumption,
        new Array(state.resourceCount).fill(0)
      ],
      mvp: state.mvp.map(row => [...row, 0])
    }));

  deleteProduct = id => {
    if (this.state.products.length === 1) return;
    let index = this.state.products.findIndex(p => p.id === id);
    this.setState(state => ({
      ...state,
      products: [
        ...state.products.slice(0, index),
        ...state.products.slice(index + 1).map(v => {
          v.id -= 1;
          return v;
        })
      ],
      resourceConsumption: [
        ...state.resourceConsumption.slice(0, index),
        ...state.resourceConsumption.slice(index + 1)
      ],
      mvp: state.mvp.map(row => [
        ...row.slice(0, index),
        ...row.slice(index + 1)
      ])
    }));
  };

  resourcesChanged = e => {
    let newValue = Number(e.currentTarget.value);
    const { resourceConsumption, fonds, resourceCount } = this.state;
    let newResourceConsumption, newFonds;
    if (newValue < 1) newValue = 1;
    if (newValue === resourceCount) return;
    else if (newValue < resourceCount) {
      newResourceConsumption = resourceConsumption.map(row =>
        row.slice(0, newValue)
      );
      newFonds = fonds.map(row => row.slice(0, newValue));
    } else {
      newResourceConsumption = resourceConsumption.map(row => {
        let newRow = row.slice();
        newRow.push(...new Array(newValue - row.length).fill(0));
        return newRow;
      });
      newFonds = fonds.map(row => {
        let newRow = row.slice();
        newRow.push(...new Array(newValue - row.length).fill(0));
        return newRow;
      });
    }
    this.setState({
      resourceCount: newValue,
      fonds: newFonds,
      resourceConsumption: newResourceConsumption
    });
  };

  periodsChanged = e => {
    let newValue = Number(e.currentTarget.value);
    const { fonds, mvp, resourceCount, periodsCount } = this.state;
    let newFonds, newMvp;
    if (newValue < 1) newValue = 1;
    if (newValue === periodsCount) return;
    else if (newValue < periodsCount) {
      newFonds = fonds.slice(0, newValue);
      newMvp = mvp.slice(0, newValue);
    } else {
      newFonds = [
        ...fonds,
        ...new Array(newValue - periodsCount).fill(
          new Array(resourceCount).fill(0)
        )
      ];
      newMvp = [
        ...mvp,
        ...new Array(newValue - periodsCount).fill(
          new Array(resourceCount).fill(0)
        )
      ];
    }
    this.setState({ periodsCount: newValue, mvp: newMvp, fonds: newFonds });
  };

  getPlan = () => {
    const {
      products,
      resourceCount,
      periodsCount,
      fonds,
      resourceConsumption,
      mvp
    } = this.state;
    axios
      .post(
        `${host}/api`,
        {
          products,
          resourceCount,
          periodsCount,
          resourceConsumption,
          fonds,
          mvp
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(({ data }) => {
        if (data.error) return alert(data.error);
        this.setState({
          plan: data.products,
          report: data.report
        });
      })
      .catch(err => {
        debugger;
        alert(err);
      });
  };

  saveData = () => {
    const {
      products,
      resourceCount,
      periodsCount,
      fonds,
      resourceConsumption,
      mvp
    } = this.state;
    const element = document.createElement("a");
    const file = new Blob(
      [
        JSON.stringify({
          products,
          resourceCount,
          periodsCount,
          fonds,
          resourceConsumption,
          mvp
        })
      ],
      { type: "application/json", endings: "native" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `data-${new Date().toISOString()}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  loadData = e => {
    e.stopPropagation();
    e.preventDefault();
    let file = e.target.files[0];
    file.text().then(json => {
      this.setState(JSON.parse(json));
    });
  };

  render() {
    const {
      products,
      resourceCount,
      currentList,
      periodsCount,
      fonds,
      resourceConsumption,
      mvp,
      plan
    } = this.state;
    return (
      <div className="app">
        <div className="side-panel">
          <button onClick={() => this.refs.fileDialog.click()}>
            <input
              type="file"
              ref="fileDialog"
              style={{ display: "none" }}
              onChange={this.loadData}
            />
            Загрузить данные
          </button>
          <div className="block">
            <p className="block-header">Количество ресурсов</p>
            <input
              type="number"
              className="block-input"
              onChange={this.resourcesChanged}
              value={resourceCount}
            />
          </div>
          <div className="block">
            <p className="block-header">Количество периодов</p>
            <input
              type="number"
              className="block-input"
              onChange={this.periodsChanged}
              value={periodsCount}
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
            <button onClick={this.addProduct}>Добавить продукт</button>
          </div>
        </div>

        <div className="content">
          <div className="table-wrapper">
            <h2 className="content-header">
              Затраты ресурсов на единицу продукции
            </h2>
            <TableComponent
              rowCount={products.length}
              rowHeader="Изделие"
              columnCount={resourceCount}
              columnHeader="Ресурс"
              value={resourceConsumption}
              onChange={v => this.setState({ resourceConsumption: v })}
            />
          </div>

          <div className="table-wrapper">
            <h2 className="content-header">Фонды ресурсов</h2>
            <TableComponent
              rowCount={periodsCount}
              rowHeader="Период"
              columnCount={resourceCount}
              columnHeader="Ресурс"
              value={fonds}
              onChange={v => this.setState({ fonds: v })}
            />
          </div>

          <div className="table-wrapper">
            <h2 className="content-header">
              Минимально необходимые партии продукции
            </h2>
            <TableComponent
              rowCount={periodsCount}
              rowHeader="Период"
              columnCount={products.length}
              columnHeader="Изделия"
              value={mvp}
              onChange={v => this.setState({ mvp: v })}
            />
          </div>

          <div className="buttons">
            <button className="btn" onClick={this.getPlan}>
              Рассчитать
            </button>
            <button className="btn" onClick={this.saveData}>
              Сохранить данные
            </button>
          </div>
        </div>

        {plan ? (
          <div className="side-panel">
            <h2>Календарный план</h2>
            <TableComponent
              fixed
              rowCount={plan.length}
              rowHeader="Изделие"
              columnCount={plan[0].length}
              columnHeader="Период"
              value={plan}
            />
            <a download href={this.state.report}>
              Скачать отчет
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
