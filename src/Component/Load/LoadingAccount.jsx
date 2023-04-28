import React from 'react';
import { useSpring, useTransition, animated, useSpringRef, easings } from '@react-spring/web';
import './LoadingAccount.css';

export const LoadingAccount = (props) => {
    
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
            <div className='load-header2'>
                <animated.div style={{position: 'absolute', width: 195, height: 16.9, borderRadius: 3, ...springs}}/>
            </div>
            <div className='load-carcass' style={{paddingBottom: 39}}>
                <div className='load-img'>
                    <animated.div style={{position: 'absolute', width: 143, height: 143, borderRadius: 72.5, ...springs}}/>
                </div>
                <div>
                    <div className='load-img-span'>
                        <animated.div style={{position: 'absolute', width: 390, height: 26, borderRadius: 3, ...springs}}/>
                    </div>
                    <div className='load-img-span2'>
                        <animated.div style={{position: 'absolute', width: 260, height: 13, borderRadius: 3, ...springs}}/>
                    </div>
                </div>
            </div>
            <div className='load-header' style={{marginBottom: 26}}>
                <animated.div style={{position: 'absolute', width: 130, height: 26, borderRadius: 3, ...springs}}/>
            </div>
            <div className='load-carcass'>
                <div>
                    <div className='load-input'>
                        <animated.div style={{position: 'absolute', width: 390, height: 39, borderRadius: 3, ...springs}}/>
                    </div>
                    <div className='load-input'>
                        <animated.div style={{position: 'absolute', width: 390, height: 39, borderRadius: 3, ...springs}}/>
                    </div>
                    <div className='load-input'>
                        <animated.div style={{position: 'absolute', width: 390, height: 39, borderRadius: 3, ...springs}}/>    
                    </div>
                </div>
                <div style={{marginLeft: 19.5}}>
                    <div className='load-input'>
                        <animated.div style={{position: 'absolute', width: 390, height: 39, borderRadius: 3, ...springs}}/>
                    </div>
                    <div className='load-input'>
                        <animated.div style={{position: 'absolute', width: 390, height: 39, borderRadius: 3, ...springs}}/>
                    </div>
                    <div className='load-input'>
                        <animated.div style={{position: 'absolute', width: 390, height: 39, borderRadius: 3, ...springs}}/>
                    </div>
                </div>
            </div>
            <div className='load-btn'>
                <animated.div style={{position: 'absolute', width: 104, height: 26, borderRadius: 3, ...springs}}/>
            </div>
        </div>
    )
}