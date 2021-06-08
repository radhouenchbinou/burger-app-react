import React, {Component} from 'react'
import Aucx from "../Aucx";
import classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideBar: false
    }

    handleSideBar = () => {
        this.setState(
            (prevState) => {
                return {showSideBar: !this.state.showSideBar};
            });
    }

    render() {
        return (
            <Aucx>
                <Toolbar handleSideBar={this.handleSideBar}/>
                <SideDrawer show={this.state.showSideBar} handleSideBar={this.handleSideBar}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aucx>
        )
    }
}

export default Layout;
