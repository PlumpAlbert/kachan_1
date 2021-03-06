import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/TableComponent.scss";

const TableComponent = ({
  rowHeader = "Row",
  columnHeader = "Column",
  rowCount = 2,
  columnCount = 3,
  value = undefined,
  fixed = false,
  onChange = undefined
}) => {
  if (!value) {
    value = new Array(rowCount).fill(new Array(columnCount).fill(0));
  }
  /**
   * Updates the value of the table cell
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @param {string} value
   */
  function updateCellValue(rowIndex, columnIndex, cellValue) {
    if (rowIndex >= value.length || rowIndex < 0) return;
    if (columnIndex >= value[0].length || columnIndex < 0) return;
    if (!/^\d+(\.\d+)*/.test(value)) return;
    let newValue = [
      ...value.slice(0, rowIndex),
      [
        ...value[rowIndex].slice(0, columnIndex),
        Number(cellValue.replace(",", ".")),
        ...value[rowIndex].slice(columnIndex + 1)
      ],
      ...value.slice(rowIndex + 1)
    ];
    if (onChange) onChange(newValue);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th colSpan={columnCount}>{columnHeader}</th>
        </tr>
        <tr>
          <th>{rowHeader}</th>
          {value[0].map((v, i) => (
            <th key={`table__header-column-${i}`}>{i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {value.map((row, i) => (
          <tr key={`table__row-${i}`}>
            <th>{i + 1}</th>
            {row.map((v, j) => (
              <td key={`table__cell-${i}-${j}`}>
                {fixed ? (
                  v
                ) : (
                  <input
                    defaultValue={v}
                    type="number"
                    onChange={e => updateCellValue(i, j, e.currentTarget.value)}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableComponent.propTypes = {
  rowHeader: PropTypes.string,
  columnHeader: PropTypes.string,
  rowCount: PropTypes.number,
  columnCount: PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  fixed: PropTypes.bool,
  onChange: PropTypes.func
};

export default TableComponent;
