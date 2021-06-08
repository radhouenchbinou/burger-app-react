import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'
import axios from "../../../Axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aucx from "../../../hoc/Aucx";
import errorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import Input from "../../../components/UI/Forms/Input/Input";

class ContactData extends Component {

    inputInit = (elementType, type, placeholder, value, validation, isValid) => {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: validation,
            valid: isValid,
            touched : false

        }
    }

    state = {
        orderForm: {
            name: this.inputInit('input', 'text', 'Your Name', '', {
                required: true,
                minLength: 3,
                maxLength: 20
            }, false),
            street: this.inputInit('input', 'text', 'Street', '', {required: true}, false),
            zipCode: this.inputInit('input', 'text', 'ZIP code', '', {required: true}, false),
            country: this.inputInit('input', 'text', 'Country', '', {required: true}, false),
            email: this.inputInit('input', 'email', 'Email', '', {required: true}, false),
            telephone: this.inputInit('input', 'text', 'Phone number', '', {
                required: true,
                minLength: 8,
                maxLength: 8,
                isNumeric: true
            }, false),
            deliveryMethode: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'cheapest',
                valid: true
            }
        },
        loading: false,
        error: false,
        canSubmit: false,
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = (value.length >= rules.minLength) && isValid
            }
            if (rules.maxLength) {
                isValid = (value.length <= rules.maxLength) && isValid
            }
            if (rules.isNumeric) {
                isValid = !isNaN(value)
                console.log(isNaN(value))
            }
        }
        return isValid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
            console.log(formElementIdentifier, this.state.orderForm[formElementIdentifier].value)
        }
        const order = {
            id: uuidv4(),
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice.toFixed(2),
            customer: formData
        }
        this.setState({
            loading: true
        });
        axios.post('/orders.json', order).then(value => {
            console.log(value);
            this.setState({
                loading: false,
                error: false
            })
            this.props.history.push('/')
        }).catch(
            error => {
                console.log('on error', error)
                this.setState({
                    loading: false,
                    error: true
                })
            }
        )
    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log("oiajijipj")
        console.log(event.target.value, inputIdentifier);
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updateOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updateOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({
            orderForm: updateOrderForm
        })
        console.log(updatedFormElement)
    }

    render() {
        const formElementsArray = [];
        let disable = false;
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
            if (!this.state.orderForm[key].valid || !this.props.ingredients || !this.props.totalPrice) {
                disable = true;
            }
        }
        let form = (<Spinner/>)
        if (this.state.error && !this.state.loading) {
            form = (<p>ERROR OCCURED PLEASE TRY AGAIN</p>)
        }
        if (!this.state.loading && !this.state.error) {
            form = (
                <Aucx>
                    <h4>Enter your contact data please!</h4>
                    <form onSubmit={this.handleSubmit}>
                        {formElementsArray.map(value => (
                            <Input
                                label={value.id}
                                key={value.id}
                                elementType={value.config.elementType}
                                elementConfig={value.config.elementConfig}
                                value={value.config.value}
                                invalid={!value.config.valid}
                                changed={(event) => this.inputChangeHandler(event, value.id)}
                                touched={value.config.touched}
                            />
                        ))}
                        <Button disable={disable} btnType="Success">ORDER</Button>
                    </form>
                </Aucx>
            )
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default errorHandler(ContactData, axios)
