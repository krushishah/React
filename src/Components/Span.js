import React from 'react'

function Span(props) {
    return (
        <span id={props.id} className={props.className} onClick={props.onClick}></span>
    )
}
export default Span

