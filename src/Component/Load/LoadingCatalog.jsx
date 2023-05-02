import React from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import './LoadingCatalog.css';

export const LoadingCatalog = (props) => {
    
    const springs = useSpring({
        from: { background: 'linear-gradient(90deg,rgb(218, 218, 218), rgb(248, 248, 248),1%,rgb(248, 248, 248),20%,rgb(238, 238, 238))'},
        to: { background: 'linear-gradient(90deg,rgb(218, 218, 218),rgb(248, 248, 248),140%,rgb(248, 248, 248), 200%,rgb(238, 238, 238))'},
        config: {
            duration: 700,
            easing: easings.easeOutQuad
        },
        loop: true,
    });

    return (
        <div>
           <div className='load-catalog-container'>
                <div>
                    <animated.div className='load-img-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-about-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-price-catalog' style={{...springs}} ></animated.div>
                </div>
                <div>
                    <animated.div className='load-img-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-about-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-price-catalog' style={{...springs}} ></animated.div>
                </div>
                <div>
                    <animated.div className='load-img-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-about-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-price-catalog' style={{...springs}} ></animated.div>
                </div>
           </div>
           <div className='load-catalog-container'>
                <div>
                    <animated.div className='load-img-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-about-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-price-catalog' style={{...springs}} ></animated.div>
                </div>
                <div>
                    <animated.div className='load-img-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-about-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-price-catalog' style={{...springs}} ></animated.div>
                </div>
                <div>
                    <animated.div className='load-img-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-about-catalog' style={{...springs}} ></animated.div>
                    <animated.div className='load-price-catalog' style={{...springs}} ></animated.div>
                </div>
           </div>
        </div>
    )
}