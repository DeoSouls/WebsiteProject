import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../../../axios-service';
import './ProductPage.css'

export const ProductPage = () => {

    const { prodId } = useParams();

    // useEffect(() => {
    //     api.post()
    // }, [])

    return (
        <div>
            <h1>Какой то продукт №( {prodId} )</h1>
        </div>
    )
}