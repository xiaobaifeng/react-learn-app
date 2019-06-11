import React, { Component } from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';
import './FilterableProductTable.css';

export default class FilterableProductTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sourceProducts: [],
      products: []
    }
    this.search = this.search.bind(this);
  }

  search ({searchTxt, onlyInStock}) {
    const lowerSearchTxt = searchTxt.toLowerCase()
    this.setState({
      products: this.state.sourceProducts.filter(product => 
        (product.category.toLowerCase().indexOf(lowerSearchTxt) > -1 || product.name.toLowerCase().indexOf(lowerSearchTxt) > -1) && (!onlyInStock || product.stocked)
      )
    })
  }

  componentDidMount() {
    fetch('./products.json').then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          sourceProducts: data.products,
          products: data.products
        })
        this.search()
      }).catch(err => {
        console.log('Error Reading data ' + err);
      })
  }

  render() {
    const productCategoryList = this.state.products.reduce((categoryList, {category, price, stocked, name}) => {
      if (!categoryList[category]) {
        categoryList[category] = [
          {price, stocked, name}
        ]
      } else {
        categoryList[category] = categoryList[category].concat({price, stocked, name})
      }
      return categoryList
    }, {})
    let tableBody = [];
    Object.keys(productCategoryList).forEach(category => {
      const productRows = productCategoryList[category].map(product => 
        (<ProductRow key={product.name} stocked={product.stocked} name={product.name} price={product.price} />)
      )
      tableBody.push(<ProductCategoryRow  key={category} title={category} />)
      tableBody = tableBody.concat(productRows)
    })

    return (
      <div>
        <SearchBar onSearch={this.search} />
        <table>
          <tbody>
            <ProductTable colHeaders={['name', 'price']}/>
            {tableBody}
          </tbody>
        </table>
      </div>
    );
  }

}