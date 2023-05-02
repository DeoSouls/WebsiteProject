import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { mobState } from '../../../Component/mobState';
import { observer } from 'mobx-react-lite';
import './ProductSummary.css';

export const ProductSummary = (props) => {

    const {img, products, review, info} = props.prod;
    const mobval = new mobState({enter: false, inx: null});

    const MobValue = observer(({mobvalue, index}) => 
        mobvalue.value.enter && mobvalue.value.inx === String(index)? description({index}) : null
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
        const index = props.index;
        return (
            <div onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <div className='description-background'/>
                <animated.p style={{...springs}} className='description-product'>{`${info[index].info}`}</animated.p>
            </div>
        )
    }

    const rating = (index) => {

        var meanrate = null;
        var corrate = null;
        var defrate = null;
        var undefrate = null;
        var meanrateinter = null;

        if(review[index].length > 0){
            for (let i = 0; i < review[index].length; i++) {
                meanrateinter += review[index][i].rate
            }

            meanrate = Math.ceil(meanrateinter / review[index].length);
            corrate = meanrate % (meanrateinter / review[index].length);

            defrate = 5 - meanrate;
            undefrate = 5 - defrate;

        }  else {
            corrate = 0;
            defrate = 5;
            undefrate = 0;
        }
        
        var imgObject = [];

        if(corrate !== 0 ) {
            for (let i = 0; i < undefrate - 1; i++) {
                imgObject.push(<img className='rate-star' src="http://localhost:5000/static/kindpng.png" alt="" />);
            }
            for (let i = 0; i < corrate; i++) {
                imgObject.push(<img className='rate-star' src="http://localhost:5000/static/kindpng3.png" alt="" />);
            }
            for (let i = 0; i < defrate; i++) {
                imgObject.push(<img className='rate-star' src="http://localhost:5000/static/kindpng2.png" alt="" />);
            }
            return [...imgObject]

        } else if (corrate === 0 || corrate === NaN) {
            if (undefrate === 0) {
                for (let i = 0; i < defrate; i++) {
                    imgObject.push(<img className='rate-star' src="http://localhost:5000/static/kindpng2.png" alt="" />);
                }
            } else {
                for (let i = 0; i < undefrate; i++) {
                    imgObject.push(<img className='rate-star' src="http://localhost:5000/static/kindpng.png" alt="" />);
                }
                for (let i = 0; i < defrate; i++) {
                    imgObject.push(<img className='rate-star' src="http://localhost:5000/static/kindpng2.png" alt="" />);
                }
            }
           
            return [...imgObject];
        }
    };
    
    var totalProd;
    var cardProduct;

    if(Object.keys(props.prod).length > 0 && img.length > 0) {
        totalProd = products;
        cardProduct = totalProd.map((good, index) => {
            return (
            <div className='products-card'>
                <div>
                    <a href={`/catalog/product/${good.id}`}>
                        <div className='product-ref' onMouseEnter={e => imageEnter(e)} onMouseLeave={e => imageLeave(e)} id={index}>
                            <MobValue mobvalue={mobval} index={index} />
                            <p className='product-card-price'>{good.price}₽</p>
                            <img className='product-image' src={img[index][0].img} alt=""/>
                        </div>
                    </a>
                    <p className='product-card-data'>{good.name}</p>
                    <div className='product-rating'>
                        {rating(index)}
                    </div>
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