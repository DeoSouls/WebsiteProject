import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../../../axios-service';
import Counter from '../../../Component/Counter/Counter';
import './ProductPage.css'
import { observer } from 'mobx-react-lite';

export const ProductPage = () => {

    const { prodId } = useParams();
    const counter = new Counter(1);

    const [prodData, setData] = useState({header: '', product: [], rate: 2.6, image: '', prodinfo: [], discount: ''});
    const [borderValue, setBorder] = useState({container: [], color: ''});

    const MobCounter = observer(({ counter }) => 
        <input className='counter-input' type="text" onChange={handlerChange}  value={counter.count} />
    )


    useEffect(() => {
        api.post('http://localhost:5000/api/data', { prodId: prodId })
        .then(response => settingProdData(response.data))
    }, []);

    function settingProdData(data) {
        console.log(data);
        setData({header: data.product.name, product: data.product, rate: prodData.rate, 
            image: data.image.img, prodinfo: data.data, discount: data.discount.value});
    }

    function handlerChangeImg() {
        setData({header: prodData.header, product: prodData.product, rate: prodData.rate, 
            image: prodData.image, prodinfo: prodData.data, discount: prodData.discount});
    }

    function handlerChange(event) {
        counter.count = event.target.value;
    }

    function priceTotal() {

        const discount = Number(prodData.discount);
        const price = Number(prodData.product.price);

        console.log(discount);
        console.log(price);


        if (prodData.discount !== '0') {
            const total = (1 - price / discount) * 100;
            console.log(Math.round(total));

            return (
                <div className='total-price'>
                    <div className='total-container'>
                        <p className='total-discount'><strike>{discount}</strike></p>
                        <p className='total-percent'>–{Math.round(total)}%</p>
                    </div>
                    <p className='total-cost'>{price} ₽</p>
                </div>
            )
        } else {

            return (
                <div className='total-price' style={{paddingTop: '20px'}}>
                    <p className='total-cost'>{price} ₽</p>
                </div>
            )
        }
    }

    function changeColor(index, colored) {

        const container = document.getElementById(`border-coloring${index}`);

        setBorder({container: container, color: colored});
        
        if (container.style.borderColor === 'black') {
            
            container.style.borderColor = 'rgb(155, 155, 155)';
        } else {
            container.style.borderColor = 'black';
            if(borderValue.container.length === undefined) {
                borderValue.container.style.borderColor = 'rgb(155, 155, 155)';
            }
        }
    }

    function productColor() {
        const color = prodData.prodinfo.color;

        var colorContainer = [];

        if(color !== undefined) {

            const colors = color.split('&');

            for (let i = 0; i < colors.length; i++) {
                if( colors[i] !== '') {
                    colorContainer.push(
                    <div className='border-coloring' id={`border-coloring${i}`}>
                        <div style={{backgroundColor: colors[i]}} className='color-fill' 
                        onClick={e => changeColor(i, colors[i])}></div>
                    </div>)
                }
            }

            return [...colorContainer]
        }
    }

    const rating = () => {
        const meanrate = Math.ceil(prodData.rate);
        const corrate = meanrate % prodData.rate;

        const defrate = 5 - meanrate;
        const undefrate = 5 - defrate;

        var imgObject = [];

        if(corrate !== 0 || prodData.rate < 1 && prodData.rate !== 0) {
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

    return (
        <div>
            <div className='clg-prod-container'>
                <div className='clg-prod-title'>
                    <div>
                        <a className='clg-prod-ref' href="/">Home </a> 
                        /  
                        <a className='clg-prod-ref' href="/catalog"> Catalog </a> 
                        /  
                        <a className='clg-prod-ref' href={`/catalog/product/${prodData.product.id}`}> Product№{prodData.product.id}</a>
                    </div>
                    <h1 className='clg-prod-header'>{prodData.header}</h1>
                    <div>
                        <div className='rate-container'>
                            <a className='ref-review' href="">{rating()} <p style={{marginLeft: '7px'}}>Reviews</p></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='clg-prod-content'>
                <div className='image-container'>
                    <div className='img-bar'>
                        <button onClick={e => handlerChangeImg} className='btn-look'>
                            <img className='btn-img-back' src={prodData.image} alt="" />
                        </button>
                    </div>
                    <div className='img-content'>
                        <img className='clg-main-image' src={prodData.image} alt="" />
                    </div>
                </div>
                <div className='description-card'>
                    <div className='description-form'>
                        <p className='description-title'>{prodData.product.name}</p>
                        <p className='description-content'>{prodData.prodinfo.info}</p>
                        <p className='description-content'>Цвет: {borderValue.color}</p>
                        <div className='color-choosing'>
                            {productColor()}
                        </div>
                        {priceTotal()}
                        <p className='product-delivery'>Доставка Почтой 17 мая – 160,00 ₽</p>
                        <div className='counter-container'>
                            <MobCounter counter={counter} />
                            <div className='counter-manager'>
                                <button className='btn-increment' onClick={e => counter.increment()}>
                                    <img className='counter-inc-img' src="http://localhost:5000/static/back.png" alt="" />
                                </button>
                                <button className='btn-decrement' onClick={e => counter.decrement()}>
                                    <img className='counter-dec-img' src="http://localhost:5000/static/back.png" alt="" />
                                </button>
                            </div>
                            <button className='btn-addbusket'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}