import React from 'react'
import './Button.css'
const button = (props) =>{
    let buttonElement = ""
buttonElement = <button disabled = {props.disabled} id={props.id} className = {props.className}  onClick = {props.onClick} >{props.label}</button>
    return (
        <div>
            {buttonElement}
        </div>
    );
}

export default button