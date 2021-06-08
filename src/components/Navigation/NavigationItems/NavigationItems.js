import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">
            Burger Builder
        </NavigationItem>
        <NavigationItem exact link="/checkout">
            Checkout
        </NavigationItem>
        <NavigationItem exact link="/orders"  >
            My Orders
        </NavigationItem>
    </ul>
)

export default NavigationItems;
