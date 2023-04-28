import React from 'react';
import video from '../../videos/video.mp4';
import './Main.css';

export const Main = (props) => {

    return (
        <div>
            <div className='video-header'>
                <h1 className='header'>
                Live life  
                    <span className='header-part-cursive'> to the fullest</span>
                </h1>
                <h1 className='header2'>This is a legacy, and when all is said and done, leave a legacy in any way.</h1>
                <video className='video-main' height='500' autoPlay loop muted playsInline>
                    <source className='video-settings' src={video} type='video/mp4'/>
                </video>
            </div>
            <div className='btn-groups'>
                <button className='btn-group' id='techno' onClick={props.onGroup}>Techno</button>
                <button className='btn-group' id='cloth' onClick={props.onGroup}>Cloth</button>
                <button className='btn-group' id='food' onClick={props.onGroup}>Food</button>
            </div>
            
        </div>
    )
}