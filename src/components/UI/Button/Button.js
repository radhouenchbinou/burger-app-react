import React from 'react'

import classes from './Button.css'

const Button = (props) => {
    const buttonClasses = [classes.Button,classes[props.btnType]]
    return (
        <button onClick={props.clicked} disabled={props.disable}
                className={buttonClasses.join(' ')}>{props.children}</button>
    );
}

export default Button
