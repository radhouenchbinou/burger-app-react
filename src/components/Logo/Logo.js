import React from 'react'

import burgerLogo from '../../assets/burger-logo.png.png'

import classes from './Logo.css'

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <a href="/"><img src={burgerLogo} alt="burger icon"/></a>
    </div>
)

export default Logo;
