import React, { forwardRef } from 'react';
import './Dialog.css';

export const Dialog = forwardRef((props, ref) => {

    function handlerAccess() {
        const dialog = document.getElementById(`dg-confirm${props.index}`);
        dialog.close();
    }

    return (
        <div >
            <dialog id={`dg-confirm${props.index}`} className='dialog-item' ref={ref}>
                {props.type === 'error'? <img className='dg-image' src="http://localhost:5000/static/errorx.png" /> 
                : <img className='dg-image' src="http://localhost:5000/static/confirm.png" />}
                <p className='dg-text'></p>
                <button className='dg-access' onClick={e => handlerAccess()}>ОК</button>
            </dialog>
        </div>
    )
})