import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckOutSummary.css';

const CheckOutSummary = (props) => {

    const handleCancel = () => {
    }

    return (
        <div className={classes.CheckOutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%',margin:"auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked={props.handleCancel}
            >CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.handleContinue}

            >CONTINUE</Button>
        </div>
    );
}

export default CheckOutSummary;
