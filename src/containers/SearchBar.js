import React, { Component } from 'react';
import './SearchBar.css'

export default class ProductCategoryRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchTxt: '',
      onlyInStock: false
    };
  }

  render() {
    return (
      <div className="search-Bar">
        <div className="search-Bar__input">
          <input type="text" />
        </div>
        <div className="search-Bar__additional">
          <input
            name="isGoing"
            type="radio"
            value={this.state.onlyInStock} />
          <span>Only show products in stock</span>
        </div>
      </div>
    );
  }
}