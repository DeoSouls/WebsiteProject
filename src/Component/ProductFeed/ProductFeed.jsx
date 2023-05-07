import React, { useEffect } from 'react';
import api from '../../axios-service';
import './ProductFeed.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const ProductFeed = (props) => {

    const [imageValue, setImageValue] = useState([]);
    const [offsetValue, setOffsetValue] = useState(0);

    const navigation = useNavigate();

    useEffect(() => {
        getImage();
    }, [])

    function getImage() {
        api.get('http://localhost:5000/api/get_image')
        .then(response => setImageValue(response.data))
        .catch(error => console.log(error));
    }

    function imageTape() {
        var images = [];
        if(imageValue.images !== undefined){
            for (let i = 0; i < imageValue.images.length; i++) {
                images.push(
                    <div className='prdfeed-product' onClick={e => navigation(`/catalog/product/${imageValue.products[i].id}`)}>
                        <img className='prdfeed-image' src={imageValue.images[i][0].img} alt="" />
                        <p className='prdfeed-name'>{imageValue.products[i].name}</p>
                    </div>
                )
            }
            return [...images]
        }
    }

    function moveLeft() {
        var offset = offsetValue;
        var totaloffset = offset + 200;
        const feed = document.getElementById('prdfeed-main');

        if(totaloffset <= 0) {
            feed.style.translate = `${totaloffset}px`;
            setOffsetValue(totaloffset);
        } else {
            setOffsetValue(offset);
        }
    }

    function moveRight() {
        var offset = offsetValue;
        var totaloffset = offset - 200;
        const feed = document.getElementById('prdfeed-main');

        const properties = feed.getBoundingClientRect();
        var width = properties.width;

        if(totaloffset >= -Number(width - 1400)) {
            feed.style.translate = `${totaloffset}px`;
            setOffsetValue(totaloffset);
        } else {
            setOffsetValue(offset);
        }
    }
 
    return (
        <div>
            <h1 className='footer-recomended'>{props.header}</h1>
            <div className='prdfeed-container'>
                <div className='prdfeed-tape'>
                    <button onClick={e => moveRight()} className='btn-moveleft'></button>
                    <div className='prdfeed-main' id='prdfeed-main'>
                        {imageTape()}
                    </div>
                    <button onClick={e => moveLeft()} className='btn-moveright'></button>
                </div>
            </div>
        </div>
    )
}