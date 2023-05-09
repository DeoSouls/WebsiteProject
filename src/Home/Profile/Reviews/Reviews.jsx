import React, { useEffect } from 'react';
import api from '../../../axios-service';
import './Reviews.css';
import { useState } from 'react';

export const Reviews = (props) => {

    const [reviewValues, setReviewsValue] = useState([]); 

    useEffect(() => {
        getReviews();
    },[]);

    function getReviews() {
        api.get('http://localhost:5000/api/get_reviews')
        .then(response => {setReviewsValue(response.data), console.log(response.data)})
        .catch(error => console.log(error));
    }
 
    function reviews()  {
        var containerReviews = [];
        var containerImages = [];
        console.log(reviewValues);
        if(reviewValues.reviews !== undefined) {
            reviewValues.reviews.forEach((rev, index) => {
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
                }
                containerReviews.push(
                    <div className='product-review'>
                        <div >
                            <img className='product-container' src={reviewValues.images[index][0].img} alt="" />
                            <p className='product-name'>{reviewValues.products[index][0].name}</p>
                        </div>
                        <div className='review-container'>
                            <div className='user-review-container'>
                                <div className='user-rate'>
                                    {[...containerImages]}
                                </div>
                                <div className='user-rate'>
                                    <img className='review-img-user' src="http://localhost:5000/static/avatar-user.jpg" alt="" />
                                    <p className='review-username'>{reviewValues.user.firstname} {reviewValues.user.lastname.substring(0,1).toLocaleUpperCase()}.</p>
                                </div>
                                <p className='review-date'>{new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')}</p>
                            </div>
                            <div className='review-title'>
                                <p className='title'>{rev.title}</p>
                                <p className='review'>{rev.review}</p>
                            </div>
                        </div>
                    </div>
                    
                );
                containerImages = [];
            })
            
            return [...containerReviews]
        }
    }

    return (
        <div>
            <div className='reviews-header' style={{marginBottom: '50px'}}>
                <div className='reviews-avatar'>Your reviews</div>
            </div>
            {reviewValues?.reviews?.length > 0? reviews() 
            : <div className='no-reviews'>
                <h1 className='no-reviews-header'>Вы пока не оставляли отзывов</h1>
            </div>}
        </div>
    )
}