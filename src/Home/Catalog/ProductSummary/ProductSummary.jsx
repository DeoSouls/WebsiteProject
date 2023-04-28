import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { mobState } from '../../../Component/mobState';
import { observer } from 'mobx-react-lite';
import './ProductSummary.css';

export const ProductSummary = (props) => {

    const mobval = new mobState({enter: false, inx: null});

    const MobValue = observer(({mobvalue, index}) => 
        mobvalue.value.enter && mobvalue.value.inx === String(index)? description() : null
    );

    function imageEnter(event) {
        mobval.changeValue({enter: true, inx: event.currentTarget.id});
    }

    function imageLeave(event) {
        mobval.changeValue({enter: false, inx: null});
    }

    const [springs, api] = useSpring(() => ({
        from: { y: 0 },
    }));

    const handleHover = () => {
        api.start({
            from: { y: 0 },
            to: { y: 10}
        })
    }

    const handleLeave = () => {
        api.start({
            from: { y: 10 },
            to: { y: 0}
        })
    }

    const description = (props) => {
        return (
            <div onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <div className='description-background'/>
                <animated.p style={{...springs}} className='description-product'>Просто текст, мне захотелось добавить тут текст потому что это нужно для теста обновления состояния моего компонента</animated.p>
            </div>
        )
    }
    
    var totalProd;
    var cardProduct;
    const {img, products} = props.prod;

    if(Object.keys(props.prod).length > 0 && img.length > 0) {
        totalProd = products;
        cardProduct = totalProd.map((good, index) => {
            return (
            <div className='products-card'>
                <div>
                    <a href={`/catalog/product/${good.id}`}>
                        <div className='product-ref' onMouseEnter={e => imageEnter(e)} onMouseLeave={e => imageLeave(e)} id={index}>
                            <MobValue mobvalue={mobval} index={index} />
                            <img className='product-image' src={img[index][0].img} alt=""/>
                        </div>
                    </a>
                    <p className='product-card-data'>{good.name}</p>
                    <p className='product-card-data'>{good.price}</p>
                </div>
            </div>)
        })
    }

    return (
        <div className='summary'>
            {cardProduct}
        </div>
    )
}