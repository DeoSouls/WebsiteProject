import React, {useState} from "react";


export const TempCover = (props) => {

    return (
        <div className="reg-style-cover">
            <div className={`style-cover-right${props.id.temp}`}></div>
            <div className={`style-cover-left${props.id.temp}`}></div>
        </div>
    )
}