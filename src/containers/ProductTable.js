import React, { Component } from 'react';

export default class ProductTable extends Component {
  render() {
    const headerRow = this.props.colHeaders.map(colName => (<th key={colName}>{colName}</th>))
    return (
      <tr>
        {headerRow}
      </tr>
    );
  }
}