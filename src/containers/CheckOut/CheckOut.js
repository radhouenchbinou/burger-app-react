import React, {Component} from 'react';
import {Route} from 'react-router-dom'

import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {

    state = {
        ingredients: null,
        purshasable: false,
        errormsg: null
    }

    componentWillMount() {
        const search = new URLSearchParams(this.props.history.location.search);
        const ingredients = {};
        let totalPrice= 0;
        if(this.props.history.location.search.length === 0 ) {
            this.setState({
                purshasable: false,
                errormsg: 'please build a burger!',
                ingredients: ingredients
            })
            return;
        }
        for (let param of search.entries()) {
            if(param[0]!=='price'){
                ingredients[param[0]] = +param[1];
            }else {
                totalPrice = +param[1]
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice,
            purshasable: true
        })
    }



    handleCancel = () => {
        this.props.history.push('/');
    }

    handleContinue = () => {
        if(!this.state.purshasable){
            this.props.history.push('/')
            return;
        }
        this.props.history.replace('/checkout/contact-data')
    }

    render() {

        let checkoutSummary = <Spinner/>
        if (this.state.ingredients) {
            checkoutSummary = <CheckOutSummary
                handleContinue={this.handleContinue}
                handleCancel={this.handleCancel}
                ingredients={this.state.ingredients}/>
        }
        return (
            <div>
                {checkoutSummary}
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
            </div>

        )
    }
}

export default CheckOut;
