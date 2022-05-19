import React from 'react'
import { Link } from 'react-router-dom'
import './Tag.css'

function Tag({ text, size, type }) {
    return (
        <Link to='/' className={`${size} ${type} tag`}>
            #&nbsp;{text}
        </Link>
    )
}

export default Tag