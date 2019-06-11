import React, { Component } from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';
import './FilterableProductTable.css';

const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

export default class FilterableProductTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      productCategoryList: data.reduce((categoryList, {category, price, stocked, name}) => {
        if (!categoryList[category]) {
          categoryList[category] = [
            {price, stocked, name}
          ]
        } else {
          categoryList[category] = categoryList[category].concat({price, stocked, name})
        }
        return categoryList
      }, {})
    }
  }

  render() {
    let tableBody = [];
    Object.keys(this.state.productCategoryList).forEach(category => {
      const productRows = this.state.productCategoryList[category].map(product => 
        (<ProductRow key={product.name} stocked={product.stocked} name={product.name} price={product.price} />)
      )
      tableBody.push(<ProductCategoryRow  key={category} title={category} />)
      tableBody = tableBody.concat(productRows)
    })

    return (
      <div>
        <SearchBar onChange=''/>
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