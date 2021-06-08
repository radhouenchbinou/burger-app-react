import React from 'react'
import PropTypes from 'prop-types';


import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";


const Burger = (props) => {
    let transfIngredients = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_,i) => {
            return <BurgerIngredient key={key + i} type={key}/>
        })
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[])
    if(transfIngredients.length === 0) {
       transfIngredients = <p>please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transfIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

Burger.prototype = {
    ingredients: PropTypes.string.isRequired
}

export default Burger;
