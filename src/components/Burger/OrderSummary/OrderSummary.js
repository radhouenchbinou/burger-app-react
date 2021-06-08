import React from 'react'
import Aucx from "../../../hoc/Aucx";
import Button from "../../UI/Button/Button";


const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}:</span>
                    {props.ingredients[key]}
                </li>
        )}
    );


    return (
        <Aucx>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingerdients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.closeModal} btnType={'Danger'}>CANCEL</Button>
            <Button clicked={props.continueCheckout} btnType={'Success'}>CONTINUE</Button>
        </Aucx>
    )
}

export default OrderSummary;
