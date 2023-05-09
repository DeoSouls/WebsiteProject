import React, {useState} from 'react';

export const ProductColor = (props) => {
    
    const color = props.color;
    var colorContainer = [];

    const [borderValue, setBorder] = useState({container: [], color: ''});

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
    }

    return (
        <div>
            <p className='description-content' id='description-content-color' name={borderValue.color} >Цвет: {borderValue.color}</p>
            <div className='color-choosing'>
                {[...colorContainer]}
            </div>
        </div>
        
    )
}  