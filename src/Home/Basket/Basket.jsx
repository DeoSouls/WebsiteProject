import React, { useState, useEffect } from 'react';
import api from '../../axios-service';
import Counter from '../../Component/Counter/Counter';
import { ProductFeed } from '../../Component/ProductFeed/ProductFeed';
import { observer } from 'mobx-react-lite';
import './Basket.css';

export const Basket = () => {
    
    const [basketItem, setBasketItem] = useState([]);
    const [postBasket, setPostBasket] = useState([]);

    useEffect(() => {
        getBasketData();
    }, []);

    function getBasketData() {
        api.get('http://localhost:5000/api/get_basket')
        .then(response => setBasketItem(response.data))
        .catch(error => console.log(error));
    }

    function handlerChange(event) {
        counter.count = event.target.value;
    }

    function defPrice() {
        var price = 0;
        var goods = basketItem['goods'];
        var basket = basketItem['basket'];

        if(goods !== undefined) {
            for (let i = 0; i < goods.length; i++) {
                price += Number(goods[i][0].price) * basket[i].count;
            }
            return price;
        }
    }

    function defDisc() {
        var disc = 0;
        var goods = basketItem['goods'];
        var basket = basketItem['basket'];
        var discount = basketItem['discount'];

        if(goods !== undefined) {
            for (let i = 0; i < goods.length; i++) {
                disc += Number(discount[i][0].value) * basket[i].count;
            }
            return disc;
        }
    }

    function handlerClick(index, count) {

        var goods = basketItem['goods'];
        var img = basketItem['image'];
        var info = basketItem['info'];
        var basket = basketItem['basket'];
        var discount = basketItem['discount'];

        basket[index].count = count;
        setBasketItem({goods: goods, image: img, info: info, basket: basket, discount: discount});
    }

    function deleteItem(event, goodId, basketId) {

        api.post('http://localhost:5000/api/delete_basket', {indexProduct: goodId, basketId: basketId})
        .then(response => console.log(response.data))
        .catch(error => console.log(error));

        getBasketData();
    }

    function productCards() {
        var prod_card = [];

        var goods = basketItem['goods'];
        var img = basketItem['image'];
        var info = basketItem['info'];
        var basket = basketItem['basket'];

        if(goods !== undefined) {
            for (let i = 0; i < goods.length; i++) {

                const counter = new Counter(basket[i].count);

                const MobCounter = observer(({counter}) => 
                    <input className='counter-input' type="text" id={`counter${i}`} onChange={handlerChange}  value={counter.count} />
                );

                prod_card.push(
                    <div className='product-card'>
                        <img className='card-image' src={img[i][0].img} />
                        <div className='card-info'>{info[i][0].info}</div>
                        <div className='card-price'>{goods[i][0].price} ₽</div>
                        <div className='card-count'>
                            <MobCounter counter={counter} />
                            <div className='counter-manager'>
                                <button className='btn-increment' onClick={e => {counter.increment(), handlerClick(i, counter.count)}}>
                                    <img className='counter-inc-img' src="http://localhost:5000/static/back.png" alt="" />
                                </button>
                                <button className='btn-decrement' onClick={e => {counter.decrement(), handlerClick(i, counter.count)}}>
                                    <img className='counter-dec-img' src="http://localhost:5000/static/back.png" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className='card-type'>{basket[i].color}</div>
                        <div style={{marginLeft: '17px'}} className='card-total'>{Number(goods[i][0].price) * basket[i].count} ₽</div>
                        <div className='card-delete' id={i} onClick={e => deleteItem(e, goods[i][0].id, basket[i].id)}></div>
                    </div>
                )
            }
            return [...prod_card];
        }
    }

    return (
        <div>
            <div className='header-container'>
                <div>
                    <p className='header-content'>Корзина</p>
                </div>
            </div>
            <div className='content-container'>
                <div className='cart-content'>
                    <div className='cart-elements'>
                        <div className='product-attributes'>
                            <span className='column-product'>Товар</span>
                            <span className='column-description'>Описание</span>
                            <span className='column-price'>Цена</span>
                            <span className='column-qty'>Кол-во</span>
                            <span className='column-type'>Тип</span>
                            <span className='column-total'>Всего</span>
                        </div>
                        {productCards()}
                    </div>
                </div>
                <div className='totalcost-content'>
                    <div className='element-descriptions'>
                        <div className='order-summary'>Сводка по заказу</div>
                        <div className='total-sum-container'>
                            <div className='total-disc'>
                                <p className='discount-header'>Без скидки:</p>
                                <p className='discount-sum'>{defDisc()} ₽</p>
                            </div>
                            <div className='price-container'>
                                <p className='price-header'>К оплате:</p>
                                <p className='price-sum'>{defPrice()} ₽</p>
                            </div>
                        </div>
                        <button className='btn-payment'>Перейти к оформлению</button>
                        <p className='contact-description'>Есть вопросы? <a className='contact-description' href="/">Свяжитесь с нами</a> и задайте их</p>
                    </div>
                </div>
            </div>
            <ProductFeed header={'Рекомендованное'} />
        </div>
    )
}