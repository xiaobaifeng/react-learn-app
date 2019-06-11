import React, { Component } from 'react';
import './SearchBar.css'

export default class ProductCategoryRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchTxt: '',
      onlyInStock: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((state) => {
      const newState = Object.assign(state, {
        [name]: value
      })
      this.props.onSearch(newState)
      return newState
    });
  }

  render() {
    return (
      <div className="search-Bar">
        <div>{JSON.stringify(this.state)}</div>
        <div className="search-Bar__input">
          <input
            name="searchTxt"
            type="text"
            value={this.state.searchTxt}
            onChange={this.handleInputChange} />
        </div>
        <div className="search-Bar__additional">
          <input
            name="onlyInStock"
            type="checkbox"
            value={this.state.onlyInStock}
            onChange={this.handleInputChange} />
          <span>Only show products in stock</span>
        </div>
      </div>
    );
  }
}