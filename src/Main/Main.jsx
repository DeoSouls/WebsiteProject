import React from 'react';
import video from '../../videos/video.mp4';
import './Main.css';

export const Main = (props) => {

    let scrollpos = document.body.scrollTop;

    console.log(scrollpos);

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
                <div >
                    <div className='btn-group-tech' id='techno' onClick={props.onGroup} >
                        <button className='btn-block' id='techno' onClick={props.onGroup}>
                            <h1 className='techno-header'>Techno products</h1>
                            <p className='techno-description' id='techno' onClick={props.onGroup}>Всем заинтересованным представляется небольшой ассортимент товаров с большими скидками. Предлагаем современные новинки - самые быстрые и многофункциональные технологии</p>
                            <img className='techno-img' src="http://localhost:5000/static/technoback.png" alt="" id='techno' onClick={props.onGroup}/>
                        </button>
                    </div>
                </div>
                <div className='block-btn-group'>
                    <div className='btn-group' id='cloth' onClick={props.onGroup}>
                        <h1 className='cloth-header'>Cloth products</h1>
                        <p style={{width: '120px'}} id='cloth' onClick={props.onGroup} className='techno-description'>В магазине собраны модели от известных дизайнеров</p>
                        <div className='cloth-img' id='cloth' onClick={props.onGroup}></div>
                    </div>
                    <div className='btn-group' id='jewelry' onClick={props.onGroup}>
                        <h1 className='jewelry-header'>Jewelry products</h1>
                        <p style={{width: '200px'}} id='jewelry' onClick={props.onGroup} className='techno-description'>Изделия высшей пробы от российских производителей выгодно подчеркнут Вашу индивидуальность</p>
                        <div className='jewelry-img' id='jewelry' onClick={props.onGroup}></div>
                    </div>
                </div>
                <div className='block-btn-group'>
                    <div className='btn-group' >
                        <h1 className='help-header'>Help</h1>
                        <p style={{width: '180px'}}  className='techno-description'>Возникли вопросы по доставке и качестве товара? Свяжитесь с нами!</p>
                        <div className='help-img'></div>
                    </div>
                    <div className='btn-group'>
                        <h1 className='start-header'>Start</h1>
                        <p style={{width: '155px'}}  className='techno-description'>Создайте свой личный кабинет и узнавайте о нововведениях первыми!</p>
                        <div className='start-img'></div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}