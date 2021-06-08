import React from 'react'
import classes from './BackDrop.css'

const BackDrop = (props) => (
    props.show ? <div className={[classes.Backdrop,props.fromSideBar?classes.OnlyDesktop:null].join(' ')} onClick={props.click}/> : null
)


export default BackDrop
