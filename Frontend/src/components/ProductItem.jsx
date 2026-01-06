import React, { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id,name,image,price}) => {

  const {currency}=useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        <p className='pt-3 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}&nbsp;{price}</p>
      </div>

    </Link>
  )
}

export default ProductItem
