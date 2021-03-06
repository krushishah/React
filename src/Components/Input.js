import React from 'react'
import './Input.css'

const Input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                className={props.className}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (<select
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value} />
    }
    return (
        <div>
            {inputElement}
        </div>
    );
}
export default Input;