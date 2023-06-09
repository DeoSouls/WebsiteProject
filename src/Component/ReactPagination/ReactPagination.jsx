import React, { useEffect, useState } from 'react';
import api from '../../axios-service';
import './ReactPagination.css';

export const ReactPagination = (props) => {

    const result = props.result;
    const {pages, products, counts} = result;
    const filterState = props.filter;
    const prodGroup = props.group;
    

    console.log(filterState);
    const pagesLimit = pages.length;
    const pageCount = Math.ceil(counts / props.goodsCount);

    let indexPages = 0;
    if (pagesLimit >= 3) {
        indexPages = 2;
    } else {
        indexPages = 1;
    }

    const [pageValue, setPageValue] = useState(pages);
    const [indexValue, setIndexValue] = useState(indexPages);
    const [prevFocusBtn, setFocusBtn] = useState([]);

    const pagesReact = pages.map((page, index) => {
        const {number, url} = page;
        if(prevFocusBtn.length > 0 && number === prevFocusBtn[0]) {
            return <button className='btn-page' style={{backgroundColor: 'black', color: 'white'}} key={index} id={number} onClick={e => props.onClick(getNextPackage(e, number, url))}>{number}</button>
        } else {
            return <button className='btn-page' key={index} id={number} onClick={e => props.onClick(getNextPackage(e, number, url))}>{number}</button>
        }
    });

    const prevButton = pagesReact.map((prop, index) =>{

        const {props} = prop;
        const interimIndex = indexValue - indexPages;
        console.log(props);
        if(interimIndex === 0 && props.children === 1) {
            return <button className='prevBtn' key={index} onClick={e => props.onClick()}>
                <img className='prevBtn-img' src="http://localhost:5000/static/back.png" alt="" />
            </button>
        }
        if(interimIndex !== 0 && interimIndex === props.children && pagesLimit !== 2) {
            return <button className='prevBtn' key={index} onClick={e => props.onClick()}>
                <img className='prevBtn-img' src="http://localhost:5000/static/back.png" alt="" />
            </button>
        }

        if(interimIndex === 1 && interimIndex === props.children && pagesLimit === 2) {
            return <button className='prevBtn' key={index} onClick={e => props.onClick()}>
                <img className='prevBtn-img' src="http://localhost:5000/static/back.png" alt="" />
            </button>
        }
        if(interimIndex === 2 && props.children === 1 && pagesLimit === 2) {
            return <button className='prevBtn' key={index} onClick={e => props.onClick()}>
                <img className='prevBtn-img' src="http://localhost:5000/static/back.png" alt="" />
            </button>
        }
    });

    const nextButton = pagesReact.map((prop, index) =>{
        const {props} = prop;
        if(indexValue === props.children) {
            return <button className='nextBtn' key={index} onClick={e => props.onClick()}>
                <img className='nextBtn-img' src="http://localhost:5000/static/back.png" alt="" />
            </button>
        }
        if(indexValue >= pageCount && props.children === pageCount) {
            return <button className='nextBtn' key={index} onClick={e => props.onClick()}>
                <img className='nextBtn-img' src="http://localhost:5000/static/back.png" alt="" />
            </button>
        }
    });

    const startingLabels = pages.map((page, index) =>{
        const {number, url} = page;
        if (pageCount - 1 != pagesLimit && pageCount != pagesLimit) {
            if(index === 0 && number >= 4) {
                return (
                 <div style={{display: 'flex'}}>
                     <button style={{border: 'none'}} className='start-btn'>{1}</button>
                     <button style={{border: 'none'}} className='start-btn'>{2}</button>
                     <p className='btns-skip'>...</p>
                 </div>)
             } else if (index === 0 && number === 2) {
                 return (
                 <div style={{display: 'flex'}}>
                     <button style={{border: 'none'}} className='start-btn'>{1}</button>
                 </div>)
             } else if (index === 0 && number === 3) {
                return (
                <div style={{display: 'flex'}}>
                     <button style={{border: 'none'}} className='start-btn'>{1}</button>
                     <button style={{border: 'none'}} className='start-btn'>{2}</button>
                 </div>)
             }
        }
        else if (index === 0 && number === 2) {
            return (
            <div style={{display: 'flex'}}>
                <button style={{border: 'none'}} className='start-btn'>{1}</button>
            </div>)
        }
    });

    const remainingLabels = pages.map((page, index) => {
        const {number, url} = page;
        const pageLimit = pages.length;
        if (pageCount - 1 != pageLimit && pageCount != pageLimit) {
            if(index === pageLimit - 1 && number < pageCount - 2) {
                return (
                <div style={{display: 'flex'}}>
                    <p className='btns-skip'>...</p>
                    <button style={{border: 'none'}} className='remain-btn'>{pageCount - 1}</button>
                    <button style={{border: 'none'}} className='remain-btn'>{pageCount}</button>
                </div>)
            } else if (index === pageLimit - 1 && number === pageCount - 2) {
                return (
                <div style={{display: 'flex'}}>
                    <button style={{border: 'none'}} className='remain-btn'>{pageCount - 1}</button>
                    <button style={{border: 'none'}} className='remain-btn'>{pageCount}</button>
                </div>)
            } else if (index === pageLimit - 1 && number === pageCount - 1) {
                return (
                <div style={{display: 'flex'}}>
                    <button style={{border: 'none'}} className='remain-btn'>{pageCount}</button>
                </div>)
            }
        }
        else if (index === 0 && number === 1 && pageCount - 1 === pageLimit) {
            return (
            <div style={{display: 'flex'}}>
                <button style={{border: 'none'}} className='remain-btn'>{pageCount}</button>
            </div>)
        }
        
    });

    function getNextPackage(event, number, urlcode) {
        
        setFocusBtn([number])

        const packageInfo = api.post('http://localhost:5000'+ urlcode, {filter: filterState, group: prodGroup})
        .then((response) => {
            console.log(response.data);
            let {pages} = response.data;
            setPageValue(pages);
            setIndexValue(number + 1);
            return response.data
        })
        .catch(err => console.log(err));

        return packageInfo
    }

    console.log(prevFocusBtn);
    console.log(pages);

    return (
        <div className='btns-line'>
            {prevButton}
            {startingLabels}
            {pagesReact}
            {remainingLabels}
            {nextButton}
        </div>
    )
}