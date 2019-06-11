import React, { Component } from 'react';

export default class ProductTable extends Component {
  render() {
    return (
      <tr>
        <td style={!this.props.stocked ? {color: 'red'} : {}}>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
}