import React from 'react';

import classes from './Order.css'
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const  Order = (props) => {
    let transfIngredients = Object.keys(props.order.ingredients).map(key => {
        return <span
            className={classes.Ingredients}
            key={key}>{key} ({props.order.ingredients[key]})</span>
    })
    return(
    <div className={classes.Order}>
        <h3>Id: </h3><p>{props.order.id}</p>
        <h3>Ingredients: </h3>
            {transfIngredients}
        <h3>Delivery Methode:</h3><p>{props.order.customer.deliveryMethode}</p>
        <h3>Price: </h3><p><strong>USD {props.order.totalPrice}</strong></p>
    </div>
);
};

export default Order;
