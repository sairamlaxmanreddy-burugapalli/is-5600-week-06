import Card from './Card'
import Button from './Button'
import Search from './Search'
import React, { useState, useEffect } from "react";


const CardList = ({data}) => { 

  const limit = 10;
// Define the default dataset, using slice to get the first 10 products
const defaultDataset = data.slice(0, limit);

// Define the offset state variable and set it to 0
const [offset, setOffset] = useState(0);
// Define the products state variable and set it to the default dataset
const [products, setProducts] = useState(defaultDataset);

// Define the handlePrevious function
const handlePrevious = () => {
  // set the offset to the previous 10 products
  setOffset(offset - 10);
}

// Define the handleNext function
const handleNext = () => {
  // set the offset to the next 10 products
  setOffset(offset + 10);
}

// Define the useEffect hook
// This hook will run every time the offset or limit state variables change
// It will update the products state variable to the next 10 products
useEffect(() => {
  // set the products state variable to the next 10 products
  setProducts(data.slice(offset, offset + limit));
}, [offset, limit, data]); 

const filterTags = (tagQuery) => {
  const filtered = data.filter(product => {
    if (!tagQuery) {
      return product 
    }

    return product.tags.find(({title}) => title === tagQuery)
  })

  setOffset(0)
  setProducts(filtered)
}

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
      {products && products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
      </div>

      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
          </div>
      </div>
  )
}

export default CardList;