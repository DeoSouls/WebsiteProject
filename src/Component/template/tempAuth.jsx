import React, { useState} from "react";
import { TempCover } from "./tempCover";


export const TempAuth = (props) => {

    return (
        <div className="reg">
            <div className="reg-cover">
                <TempCover id={props}/>
                <div className="reg-header">
                    <button className="btn-back" onClick={e => history.back()}>back</button>
                    <p className="header-data">{props.data}</p>
                    <p className="header-main">{props.header}</p>
                    <p className="header-under">WEBSITE</p>
                </div>
            </div>
            <div className="reg-main">
                <div className='reg-form'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}