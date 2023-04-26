import React, { useState } from 'react';
import './ProductSummary.css';

export const ProductSummary = (props) => {
    
    var totalProd;
    var cardProduct;
    const {img, products} = props.prod;

    if(Object.keys(props.prod).length > 0 && img.length > 0) {
        totalProd = products;
        cardProduct = totalProd.map((good, index) => {
            return (
            <div className='products-card'>
                <div>
                    <img className='product-image' src={img[index][0].img} alt="" />
                    <p className='product-card-data'>{good.name}</p>
                    <p className='product-card-data'>{good.price}</p>
                </div>
            </div>)
        })
    }

    console.log(totalProd);

    return (
        <div className='summary'>
            {cardProduct}
        </div>
    )
}