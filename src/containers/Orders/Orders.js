import React, {Component} from 'react';

import axios from '../../Axios-orders'
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';


class Orders extends Component {

    state = {
        orders: null,
        Loading: false,
        errorOccured: false
    }

    componentDidMount() {
        this.fetchOrders()
    }

    fetchOrders = () => {
        this.setState({Loading: true, errorOccured: false})
        axios.get('/orders.json').then(
            value => {
                const orders = [];
                for (let i in value.data) {
                    orders.push(value.data[i])
                }
                orders.reverse()
                this.setState({
                    orders: orders,
                    Loading: false,
                    errorOccured: false

                })
            }
        ).catch(
            reason => {
                this.setState({
                    Loading: false,
                    errorOccured: true,
                    orders: null


                })
            }
        )
    }

    render() {
        let orderList = <Spinner/>
        if(this.state.errorOccured && !this.state.Loading){
            orderList = <p>FATAL ERROR: Please try again!</p>
        }
        if (!this.state.Loading && this.state.orders) {
            orderList = this.state.orders.map(order => {
                console.log(order.ingredients)
                return (
                    <Order order={order}/>
                )
            })
        }
        return (
            <di>
                {orderList}
            </di>
        )
    }
}

export default errorHandler(Orders,axios)
