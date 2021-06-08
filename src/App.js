import React, {Component} from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route} from 'react-router-dom'
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    // state = {
    //     show : true
    // }
    //
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({show: false},)
    //     },3000)
    // }

    render() {
        return (
            <div>
                <Layout>
                    <switch>
                        <Route path="/checkout" component={CheckOut}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/" exact component={BurgerBuilder}/>
                    </switch>
                </Layout>
            </div>
        );
    }
}

export default App;
