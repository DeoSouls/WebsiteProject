import React from 'react';
import video from '../../videos/ghb.mp4';
import './Main.css';

export const Main = (props) => {

    return (
        <div>
            <div className='video-header'>
                <h1 className='header'>
                    Optimizing your  
                    <span className='header-part-cursive'> health journey</span>
                </h1>
                <h1 className='header2'>With the most trusted name in scientific wellness</h1>
                <video className='video-main' height='500' autoPlay loop muted playsInline>
                    <source className='video-settings' src={video} type='video/mp4'/>
                </video>
            </div>
            
        </div>
    )
}