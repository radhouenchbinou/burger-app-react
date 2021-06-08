import React from "react";

import classes from './SideDrawer.css'

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aucx from "../../../hoc/Aucx";

const SideDrawer = (props) => {
    return (
        <Aucx>
            <BackDrop fromSideBar={true} show={props.show} click={props.handleSideBar}/>
            <div className={[classes.SideDrawer,props.show?classes.Open:classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>

            </div>
        </Aucx>
    );
}

export default SideDrawer;
