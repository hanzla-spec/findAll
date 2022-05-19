import React from 'react'
import './Button.css'

function Button(props) {
    const { text, type, size, button_type } = props;
    return (
        <button type={button_type} className={`${type} ${size}`} >{text}</button>
    )
}

export default Button