import React, { useEffect, useReducer, useState } from 'react';
import { ReactPagination } from '../../Component/ReactPagination/ReactPagination';
import { ProductSummary } from './ProductSummary/ProductSummary';
import { LoadingCatalog } from '../../Component/Load/LoadingCatalog';
import { TechnoType } from '../../Component/FilterTypes/TechnoType';
import { ClothType } from '../../Component/FilterTypes/ClothType';
import api from '../../axios-service';
import './Catalog.css';

export const Catalog = (props) => {

    const [goods, setGoods] = useState([]);
    const [goodPackage, setGoodPackage] = useState([]);
    const [isLoading, setloading] = useState(false)

    var productsGroup = props.prodGroup;

    if(productsGroup === undefined || productsGroup === '') {
        productsGroup = 'default';
    }

    useEffect(() => {
        getGoods(state, productsGroup);
        setTimeout(() => {
            setloading(true);
        }, 1000)
    }, [])

    const reducer = (state, update) => ({
        ...state,
        ...update,
    });

    const [state, dispatch] = useReducer(reducer, {
        phone: {filterName: '', checked: false},
        TV: {filterName: '', checked: false},
        headphone: {filterName: '', checked: false},

        cloths: {filterName: '', checked: false},
        shoes: {filterName: '', checked: false},
        accessories: {filterName: '', checked: false},
        
        meizu: {filterName: '', checked: false},
        samsung: {filterName: '', checked: false},
        redmi: {filterName: '', checked: false},
        apple: {filterName: '', checked: false},
        honor:  {filterName: '', checked: false},
        Maibenben: {filterName: '', checked: false},

        Malagrida: {filterName: '', checked: false},
        Boss: {filterName: '', checked: false},
        KLJeans: {filterName: '', checked: false},
        Reebok: {filterName: '', checked: false},
        PUMA:  {filterName: '', checked: false},
    });


    function getGoods(state, group) {
        api.post('http://localhost:5000/api/goods', {filter: state, group: group})
        .then(response => {setGoods(response.data), setGoodPackage(response.data.products)})
        .catch(err => alert(err.message));
    }

    function handlerClick(goods) {

        goods.then(p => setGoods(p));
        console.log(goods);
    }
    
    const filterObject = (event) => {
        const value = event.target.name;

        var action = {[value]: {filterName: event.target.name, checked: event.target.checked}};
        dispatch(action);

        const nextState = reducer(state, action);
        
        getGoods(nextState, productsGroup);
    }

    const paginate = () => {
        let result;

        if(Object.keys(goods).length > 0 ) {
            result = goods;
            console.log(result);
            return <ReactPagination filter={state} group={productsGroup} result={result} onClick={handlerClick} goodsCount={goodPackage.length}/>
        }
    };

    var countProducts;
    var startPackage;
    var endPackage;
    if(Object.keys(goods).length > 0) {
        countProducts = goods.counts;
        startPackage = 1;
        endPackage = goods.products.length;
    }

    return (
        <div>
            <div className='catalog'>
                <div className='header-catalog'>
                    <div>
                        <div className='pseudo-navigation'>
                            <a className='pseudo-ref' href="/">Home</a>
                            <p style={{fontFamily: 'try_cloth'}}>/</p>
                            <a className='pseudo-ref' href="/catalog">Catalog</a>
                        </div>
                        <h1 className='header-name'>{productsGroup.substring(0, 1).toLocaleUpperCase()}{productsGroup.substring(1, productsGroup.length)} Bundle</h1>
                    </div>
                </div>
            </div>
            <div className='under-header'>
                <p className='product-results'>{startPackage} - {endPackage} of {countProducts} results</p>
            </div>
            <div className='catalog-content'>
                {productsGroup === 'techno'? <TechnoType filterObject={filterObject} /> : null}
                {productsGroup === 'cloth'? <ClothType filterObject={filterObject} /> : null}
                {productsGroup === 'default'? <TechnoType filterObject={filterObject} /> : null}
                <div className='catalog-cards'>
                    {isLoading?  <ProductSummary prod={goods} /> : <LoadingCatalog/>}
                    {paginate()}
                </div>
            </div>
            
        </div>
    )
}