import React from 'react'
import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const  BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>price: <strong>{props.price.toFixed(2)}$</strong></p>
        {
            controls.map(value => {
                return (<BuildControl
                    label={value.label}
                    key={value.label}
                    added={() =>props.ingredientAdded(value.type)}
                    less={() =>props.ingredientRemove(value.type)}
                />)
            })
        }
        <button
            onClick={props.checkout}
            className={classes.OrderButton}
            disabled={!props.purchaseDisabled}>ORDER NOW</button>
    </div>
)

export default BuildControls
