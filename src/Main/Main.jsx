import React from 'react';
import { useNavigate } from 'react-router';
import video from '../../videos/comp.gif';
import { ProductFeed } from '../Component/ProductFeed/ProductFeed';
import './Main.css';

export const Main = (props) => {

    const navigation = useNavigate();

    function handlerClick() {
        navigation('/registre');
    }

    return (
        <div>
            <div className='video-header'>
                <div className='header'>
                Live life  
                    <span className='header-part-cursive'> to the fullest</span>
                    <button className='btn-connect' onClick={e => handlerClick()}>Присоединяйтесь</button>
                </div>
                <h1 className='header2'>This is a legacy, and when all is said and done, leave a legacy in any way.</h1>
                <img className='video-main' src={video} alt="" />
            </div>
            <div className='btn-groups'>
                <div >
                    <div className='btn-group-tech' id='techno' onClick={props.onGroup} >
                        <button className='btn-block' id='techno' onClick={props.onGroup}>
                            <h1 className='techno-header'>Techno products</h1>
                            <p className='techno-description' id='techno' onClick={props.onGroup}>Всем заинтересованным представляется небольшой ассортимент товаров с большими скидками. Предлагаем современные новинки - самые быстрые и многофункциональные технологии</p>
                            <img className='techno-img' src="http://localhost:5000/static/technoback2.png" alt="" id='techno' onClick={props.onGroup}/>
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
                    <div className='btn-group' onClick={e => navigation('/contact/feedback')}>
                        <h1 className='help-header'>Help</h1>
                        <p style={{width: '180px'}}  className='techno-description'>Возникли вопросы по доставке и качестве товара? Свяжитесь с нами!</p>
                        <div className='help-img'></div>
                    </div>
                    <div className='btn-group' onClick={e => navigation('/registre')}>
                        <h1 className='start-header'>Start</h1>
                        <p style={{width: '155px'}}  className='techno-description'>Создайте свой личный кабинет и узнавайте о нововведениях первыми!</p>
                        <div className='start-img'></div>
                    </div>
                </div>
            </div>
            <ProductFeed header={'Продажи недели'} />
        </div>
    )
}