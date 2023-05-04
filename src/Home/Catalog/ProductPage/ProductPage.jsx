import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../../axios-service';
import Counter from '../../../Component/Counter/Counter';
import './ProductPage.css'
import { observer } from 'mobx-react-lite';

export const ProductPage = () => {

    const { prodId } = useParams();
    const navigation = useNavigate();
    const counter = new Counter(1);

    const [prodData, setData] = useState({header: '', product: [], rate: 2.6, image: '', prodinfo: [], discount: '', user: [], review: [], usersReview: []});
    const [borderValue, setBorder] = useState({container: [], color: ''});
    const [isReview, setIsReview] = useState(false);
    const [reviewValues, setReviewValues] = useState([]);

    const MobCounter = observer(({ counter }) => 
        <input className='counter-input' type="text" onChange={handlerChange}  value={counter.count} />
    );

    useEffect(() => {
        api.post('http://localhost:5000/api/data', { prodId: prodId })
        .then(response => settingProdData(response.data));
    }, []);

    const reducer = (state, update) => ({
        ...state,
        ...update
    });

    const [state, dispatch] = useReducer(reducer, {
        title: '',
        review: '',
        rate: 0,
    });

    function submitAddToCart() {
        if(borderValue.color !== '') {
            api.post('http://localhost:5000/api/add_cart', {productId: prodData.product.id, color: borderValue.color, count: counter.count})
            .then(response => alert(response.data.message))
            .catch(err => alert(err.message));
        } else {
            alert('Выберите цвет товара');
        }
    }

    function settingProdData(data) {
        console.log(data);
        setData({header: data.product.name, product: data.product, rate: prodData.rate, 
            image: data.image.img, prodinfo: data.data, discount: data.discount.value, user: data.user, review: data.review, usersReview: data.usersreview});
        interimFunc();
    }

    function interimFunc() {
        api.post('http://localhost:5000/api/data', { prodId: prodId })
        .then(response => setReviewValues([...response.data.review]))
    }

    function handlerChangeImg() {
        setData({header: prodData.header, product: prodData.product, rate: prodData.rate, 
            image: prodData.image, prodinfo: prodData.data, discount: prodData.discount, user: prodData.user, review: prodData.review, usersReview: prodData.usersreview});
    }

    function handlerChange(event) {
        counter.count = event.target.value;
    }

    function handlerIsReview() {
        if(!isReview) {

            setIsReview(true);
        } else {
            setIsReview(false);
        }
    }

    function enterRate(event) {
        if(state.rate === 0) {
            const img_id = event.currentTarget.id;
            for (let i = 0; i < img_id; i++) {
                let img = document.getElementById(i + 1);
                img.src = 'http://localhost:5000/static/kindpng.png';
            }
        }
    }

    function leaveRate(event) {
        if(state.rate === 0) {
            const img_id = event.currentTarget.id;

            console.log(reviewValues);

            for (let i = 0; i < img_id; i++) {
                let img = document.getElementById(i + 1);
                img.src = 'http://localhost:5000/static/kindpng2.png';
            }
        }
    }

    function settingRating(event) {
        const img_id = event.currentTarget.id;

        if(Number(img_id) === state.rate) {
            event.target.style.cursor = 'pointer';

            if(state.rate !== 0) {
                dispatch({rate: 0});
                event.target.style.cursor = 'default';
            }

        } else if(state.rate === 0) {
            dispatch({rate: Number(img_id)});

            event.target.style.cursor = 'pointer';

            if(state.rate !== 0) {
                dispatch({rate: 0});
                event.target.style.cursor = 'default';
            }
        }
    }

    function handlerAddReview() {
        if(prodData.user !== null){
            document.location.reload();

            api.post('http://localhost:5000/api/add_review', {title: state.title, review: state.review, rate: state.rate, userId: prodData.user.id, goodId: prodData.product.id})
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
            
        } else {
            navigation('/authorization');
        }
    }


    function priceTotal() {

        const discount = Number(prodData.discount);
        const price = Number(prodData.product.price);

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

    function reviews()  {

        var containerReviews = [];
        var containerImages = [];

        console.log(reviewValues);

        if(reviewValues.length > 0) {
            reviewValues.forEach((rev, index) => {
                const defrate = rev.rate;
                for (let i = 0; i < 5; i++) {
                    if(i < defrate) {
                        containerImages.push(
                            <img className='rate-star' src="http://localhost:5000/static/kindpng.png" alt="" />
                        )
                    } else {
                        containerImages.push(
                            <img className='rate-star' src="http://localhost:5000/static/kindpng2.png" alt="" />
                        )
                    }
                    console.log(defrate)
                }

                containerReviews.push(
                    <div className='review-container'>
                        <div className='user-review-container'>
                            <div className='user-rate'>
                                {[...containerImages]}
                            </div>
                            <div className='user-rate'>
                                <img className='review-img-user' src="http://localhost:5000/static/avatar-user.jpg" alt="" />
                                <p className='review-username'>{prodData.usersReview[index].firstname} {prodData.usersReview[index].lastname.substring(0,1).toLocaleUpperCase()}.</p>
                            </div>
                            <p className='review-date'>{new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')}</p>
                        </div>
                        <div className='review-title'>
                            <p className='title'>{rev.title}</p>
                            <p className='review'>{rev.review}</p>
                        </div>
                    </div>
                );
                containerImages = [];
            })
            
            return [...containerReviews]
        }
    }

    const add_review = (
        <div className='add-review-container'>
            <div style={{display: 'flex'}}>
                <div>
                    <p className='label-header'>Заголовок</p>
                    <input className='add-review-header' onChange={e => dispatch({title: e.target.value})} type="text" />
                </div>
                <div>
                    <p style={{marginLeft: '25px'}} className='label-header'>Выберите оценку</p>
                    <img style={{marginLeft: '25px'}} className='star-review' onClick={settingRating} onMouseEnter={enterRate} 
                    onMouseLeave={leaveRate} id='1' src="http://localhost:5000/static/kindpng2.png" alt="" />
                    <img className='star-review' id='2' onClick={settingRating} onMouseEnter={enterRate} 
                    onMouseLeave={leaveRate} src="http://localhost:5000/static/kindpng2.png" alt="" />
                    <img className='star-review' id='3' onClick={settingRating} onMouseEnter={enterRate} 
                    onMouseLeave={leaveRate} src="http://localhost:5000/static/kindpng2.png" alt="" />
                    <img className='star-review' id='4' onClick={settingRating} onMouseEnter={enterRate} 
                    onMouseLeave={leaveRate} src="http://localhost:5000/static/kindpng2.png" alt="" />
                    <img className='star-review' id='5' onClick={settingRating} onMouseEnter={enterRate} 
                    onMouseLeave={leaveRate} src="http://localhost:5000/static/kindpng2.png" alt="" />
                </div>
            </div>
            <div>
                <p className='label-header'>Отзыв</p>
                <textarea className='review-area' onChange={e => dispatch({review: e.target.value})}></textarea>
                <div className='btn-submit-review-container'>
                    <button className='btn-submit-review' onClick={handlerAddReview}>Опубликовать</button>
                </div>
                
            </div>
        </div>
    )

    const rating = () => {

        var meanrate = null;
        var corrate = null;
        var defrate = null;
        var undefrate = null;
        var meanrateinter = null;

        if(prodData.review.length > 0){
            for (let i = 0; i < prodData.review.length; i++) {
                meanrateinter += prodData.review[i].rate
            }

            meanrate = Math.ceil(meanrateinter / prodData.review.length);
            corrate = meanrate % (meanrateinter / prodData.review.length);

            defrate = 5 - meanrate;
            undefrate = 5 - defrate;

        }  else {
            corrate = 0;
            defrate = 5;
            undefrate = 0;
        }
        
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
                    <div style={{display: 'flex'}}>
                        <a className='clg-prod-ref' href="/">Home </a>  
                        <p className='nav-slash'> /</p> 
                        <a className='clg-prod-ref' href="/catalog">Catalog</a> 
                        <p className='nav-slash'>/</p> 
                        <a className='clg-prod-ref' href={`/catalog/product/${prodData.product.id}`}> Product№{prodData.product.id}</a>
                    </div>
                    <h1 className='clg-prod-header'>{prodData.header}</h1>
                    <div>
                        <div className='rate-container'>
                            <a className='ref-review' href=""><p style={{marginRight: '5px'}}>{prodData.review.length}</p> {rating()} <p style={{marginLeft: '7px'}}>Reviews</p></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='clg-prod-content'>
                <div>
                    <div className='container-product'>
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
                        <div className='prod-characteristics'>
                            <p className='characteristics-header'>Характеристики {prodData.product.name}</p>
                            <p className='characteristics-content'>{prodData.prodinfo.info}</p>
                        </div>
                        <div className='container-review-characteristics'>
                            <p className='characteristics-review'>Отзывы</p>
                            <button className='btn-review' onClick={handlerIsReview}>Оставить отзыв</button>
                            {isReview? add_review : null}
                        </div>
                        {reviews()}
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
                            <button onClick={submitAddToCart} className='btn-addbusket'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}