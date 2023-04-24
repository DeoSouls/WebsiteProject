import React, {useEffect} from 'react';
import { ReactPagination } from '../../Component/ReactPagination/ReactPagination';
import { ProductSummary } from './ProductSummary/ProductSummary';
import api from '../../axios-service';
import { useState } from 'react';
import './Catalog.css';

export const Catalog = (props) => {

    useEffect(() => {
        getGoods();
    }, [])

    const [goods, setGoods] = useState([]);
    const [goodPackage, setGoodPackage] = useState([]);

    function getGoods() {
        api.get('http://localhost:5000/api/goods')
        .then(response => {setGoods(response.data), setGoodPackage(response.data.results.rows)})
        .catch(err => alert(err.message));
    }

    function handlerClick(goods) {

        goods.then(p => setGoods(p));

        console.log(goods)
    }

    const paginate = () => {
        let result;

        if(Object.keys(goods).length > 0 ) {
            result = goods;
            console.log(result);
            return <ReactPagination result={result} onClick={handlerClick} goodsCount={goodPackage.length}/>
        }
    };

    var countProducts;
    var startPackage;
    var endPackage;
    if(Object.keys(goods).length > 0) {
        countProducts = goods.results.count;
        startPackage = goods.results.rows[0].id;
        endPackage =  goods.results.rows[goods.results.rows.length - 1].id;
    }


    return (
        <div>
            <div className='catalog'>
                <div className='header-catalog'>
                    <div>
                        <div className='pseudo-navigation'>
                            <a className='pseudo-ref' href="/">Home</a>
                            /
                            <a className='pseudo-ref' href="/catalog">Product</a>
                        </div>
                        <h1 className='header-name'>Root Bundle</h1>
                    </div>
                </div>
            </div>
            <div className='under-header'>
                <p className='product-results'>{startPackage} - {endPackage} of {countProducts} results</p>
            </div>
            <div className='catalog-content'>
                <div className='catalog-filter'>
                    <div className='product-type'>
                        <p>Product Type</p>
                    </div>
                    <div>
                        <input name='filter-phone' type="checkbox" className='filter-phone'/>
                        <label className='label-check-phone' htmlFor='filter-phone' >Phone</label>
                    </div>
                    <div>
                        <input name='filter-TV' type="checkbox" className='filter-TV'/>
                        <label className='label-check-TV' htmlFor='filter-TV'>TV</label>
                    </div>
                </div>
                <div className='catalog-cards'>
                    <ProductSummary prod={goods} />
                    {paginate()}
                </div>
            </div>
            
        </div>
    )
}