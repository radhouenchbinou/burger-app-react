import React, {Component} from 'react'

import classes from './Modal.css'
import Aucx from "../../../hoc/Aucx";
import BackDrop from "../BackDrop/BackDrop";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return (
            <Aucx>
                <BackDrop show={this.props.show} click={this.props.closeModal}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-1000vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >{this.props.children}</div>
            </Aucx>

        )
    }
}

export default Modal;
