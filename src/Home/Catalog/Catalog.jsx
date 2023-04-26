import React, { useEffect, useReducer, useState } from 'react';
import { ReactPagination } from '../../Component/ReactPagination/ReactPagination';
import { ProductSummary } from './ProductSummary/ProductSummary';
import api from '../../axios-service';
import './Catalog.css';

export const Catalog = (props) => {

    useEffect(() => {
        getGoods(state);
    }, [])
    
    const [goods, setGoods] = useState([]);
    const [goodPackage, setGoodPackage] = useState([]);
    const [updateState, setUpdateState] = useState([]);

    const reducer = (state, update) => ({
        ...state,
        ...update,
    });

    const [state, dispatch] = useReducer(reducer, {
        phone: {
            filterName: '',
            checked: false
        },
        TV: {
            filterName: '',
            checked: false
        },
        headphone: {
            filterName: '',
            checked: false
        } 
    });


    function getGoods(state) {
        console.log(state);
        api.post('http://localhost:5000/api/goods', {filter: state})
        .then(response => {setGoods(response.data), setGoodPackage(response.data.products)})
        .catch(err => alert(err.message));
    }

    function handlerClick(goods) {

        goods.then(p => setGoods(p));
        console.log(goods);
    }
    
    const filterObject =  (event) => {
        console.log(event.target.checked);
        console.log(event.target.name);
        const value = event.target.name;

        var action = {[value]: {filterName: event.target.name, checked: event.target.checked}};
        dispatch(action);

        const nextState = reducer(state, action);

        getGoods(nextState);
    }

    const paginate = () => {
        let result;

        if(Object.keys(goods).length > 0 ) {
            result = goods;
            console.log(result);
            return <ReactPagination filter={state} result={result} onClick={handlerClick} goodsCount={goodPackage.length}/>
        }
    };

    var countProducts;
    var startPackage;
    var endPackage;
    if(Object.keys(goods).length > 0) {
        countProducts = goods.counts;
        startPackage = 1;
        endPackage =  goods.products.length;
    }

    console.log(state);

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
                        <input name='phone' type="checkbox" className='filter-phone' onChange={e => filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='phone' >Phone</label>
                    </div>
                    <div>
                        <input name='TV' type="checkbox" className='filter-TV' onChange={e => filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='TV'>TV</label>
                    </div>
                    <div>
                        <input name='headphone' type="checkbox" className='filter-headphone' onChange={e => filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='headphone'>Headphone</label>
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