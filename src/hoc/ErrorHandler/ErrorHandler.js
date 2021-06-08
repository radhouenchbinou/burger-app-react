import React, {Component} from 'react';
import Aucx from "../Aucx";
import Modal from "../../components/UI/Modal/Modal";

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = ({
            error: null
        })
        resInterceptor;
        reqInterceptor;


        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(value => {
                this.setState({error: null})
                return value
            })
            this.resInterceptor = axios.interceptors.response.use(value =>  value, error => {
                this.setState({
                    error: error
                })
                console.log(error)
            })
        }

        componentWillUnmount() {
            console.log("will unmount", this.reqInterceptor,this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
            console.log("after unmount", this.reqInterceptor,this.resInterceptor)

        }

        errorConfirmHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aucx>
                    <Modal
                        show={this.state.error}
                        closeModal={this.errorConfirmHandler}
                    >
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aucx>
            )
        };
    }
}

export default errorHandler;
