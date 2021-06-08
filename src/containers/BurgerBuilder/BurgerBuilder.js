import React, {Component} from "react";

import Aucx from "../../hoc/Aucx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../Axios-orders'
import {v4 as uuidv4} from 'uuid';
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.7,
    cheese: 1.2,
    meat: 1,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        checkOutLoading: false,
        ingredientsLoading: false,
        ingredientsError: false
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({ingredientsLoading: true})
        axios.get('https://burgerapp-a783c-default-rtdb.firebaseio.com/ingredients.json').then(
            response => {
                this.setState({
                    ingredients: response.data,
                    ingredientsLoading: false,
                    ingredientsError:false
                });
                console.log(this.state.ingredients)
            }
        ).catch(reason => {
            this.setState({
                ingredientsLoading: false,
                ingredientsError: true
            })
        })
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(
            key => {
                return ingredients[key]
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount > 0 ? oldCount - 1 : 0;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldCount > 0 ? oldPrice - priceAddition : oldPrice;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    handleCheckout = () => {
        this.setState({
            purchasing: true
        })

    }

    handleCloseModal = () => {
        this.setState({
            purchasing: false
        })
    }

    getInitState = () => {
        axios.get('https://burgerapp-a783c-default-rtdb.firebaseio.com/ingredients.json').then(
            response => {
                this.setState({
                    ingredients: response.data,
                    totalPrice: 5,
                    purchasable: false,
                    purchasing: false,
                    checkOutLoading: false,
                    ingredientsLoading: false,
                    ingredientsError: false
                });
                console.log(this.state.ingredients)
            }
        ).catch(reason => {
            this.setState({
                ingredients: null,
                totalPrice: 5,
                purchasable: false,
                purchasing: false,
                checkOutLoading: false,
                ingredientsLoading: false,
                ingredientsError: true
            })
        })
    }

    // handleConinueCheckout = () => {
    //     // console.log("checkout succes");
    //     // // window.alert("you must pay " + this.state.totalPrice.toFixed(2) +'$' );
    //     // this.setState({checkOutLoading: true})
    //     //
    //     // axios.post('/orders.json', order).then(value => {
    //     //     console.log(value);
    //     //     this.getInitState();
    //     // }).catch(
    //     //     error => {
    //     //         this.setState({checkOutLoading: false});
    //     //     }
    //     // )
    // }


    handleConinueCheckout = () => {
        const params = [];
        for(let i in this.state.ingredients){
            params.push(encodeURIComponent(i) + '=' + encodeURI(this.state.ingredients[i]))
        }
        params.push("price=" + this.state.totalPrice)
        const queryParams = params.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams,
        });
    }


    render() {
        let orderSum = <Spinner/>
        let burger = <Spinner/>

        if (!this.state.ingredientsLoading && this.state.ingredients && !this.state.ingredientsError) {
            burger = (<Aucx>

                <Burger ingredients={this.state.ingredients ? this.state.ingredients : {}}> </Burger>
                <BuildControls
                    checkout={this.handleCheckout}
                    purchaseDisabled={this.state.purchasable}
                    price={this.state.purchasable ? this.state.totalPrice : 0}
                    ingredientRemove={this.removeIngredientsHandler}
                    ingredientAdded={this.addIngredientHandler}/>
            </Aucx>)
        }

        if(this.state.ingredientsError) {
            burger = <p>FATAL ERROR PLEASE REFRESH THE PAGE</p>
        }

        if (!this.state.checkOutLoading && this.state.ingredients) {
            orderSum = (<OrderSummary
                totalPrice={this.state.totalPrice}
                continueCheckout={this.handleConinueCheckout}
                closeModal={this.handleCloseModal}
                ingredients={this.state.ingredients ? this.state.ingredients : {}}/>)
        }

        return (
            <Aucx>
                <Modal show={this.state.purchasing} closeModal={this.handleCloseModal}>
                    {orderSum}
                </Modal>
                {burger}
            </Aucx>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);
