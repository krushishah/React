import React, { Component } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { updateObject, loginValidity } from '../Shared/utility'
import './Login.css'
import { connect } from 'react-redux'
import * as LoginActions from '../Store/Actions/LoginActions'

export class Login extends Component {
    state = {
        loginControls: {
            userName: {
                elementType: 'input',
                elementAttributes: {
                    type: 'text',
                    placeholder: 'User Name'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementAttributes: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
            },
        },
        Credentials: {
            user0: {
                username: "Krushi",
                password: "Krushi@12",
                email: "krushi@gmail.com",
                ID: "PP1234",
                isSelected: false,
            },
            user1: {
                username: "Deep",
                password: "Deep@1234",
                email: "Deep@gmail.com",
                ID: "PP4321",
                isSelected: false,
            }
        },
        displayMessage: "none",
        invalidMessage: "please enter correct credentials",
        isLoggedin: false,
    }
    submitHandler = (event) => {
        let valid = loginValidity(this.state.loginControls.userName.value, this.state.loginControls.password.value, this.state.Credentials)
        let displayMessage = valid.flag ? "none" : "block";
        let isLoggedin = valid.flag;
        this.setState({
            isLoggedin: isLoggedin,
            displayMessage: displayMessage,
        });
        if (valid.flag) {
            this.props.update(isLoggedin);
            this.props.updateUser(valid.user);
            this.props.history.push('/Container/Home');
        }
        event.preventDefault();
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.loginControls[inputIdentifier], {
            value: event.target.value,
        });
        const updatedControls = updateObject(this.state.loginControls, {
            [inputIdentifier]: updatedFormElement
        });
        this.setState({
            ...this.state,
            loginControls: updatedControls,
        })
    }
    render() {
        const loginElementArray = [];
        for (let key in this.state.loginControls) {
            loginElementArray.push({
                id: key,
                config: this.state.loginControls[key]
            })
        }

        let login = (
                <div className="loginform">
                    <form onSubmit={this.submitHandler} className="div" >
                        <div>
                            <h2 className="header2">PaperPlane Solutions</h2>
                        </div>
                        <div className="login">
                            {loginElementArray.map(loginElement => (
                                <Input
                                    key={loginElement.id}
                                    elementType={loginElement.config.elementType}
                                    elementConfig={loginElement.config.elementAttributes}
                                    value={loginElement.value}
                                    changed={(event) => this.inputChangedHandler(event, loginElement.id)}
                                    className="loginInput"
                                />
                            ))
                            }
                            <span style={{ display: this.state.displayMessage }} className="loginspan">{this.state.invalidMessage}</span>
                            <Button label='login' className="login-button"></Button>
                        </div>
                    </form>
                </div>
        );
        return (
            <div>
                {login}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loginControls: state.loginReducer.loginControls,
        loginCredentials: state.loginReducer.Credentials,
        displayMessage: state.loginReducer.displayMessage,
        invalidMessage: state.loginReducer.invalidMessage,
        isLoggedin: state.loginReducer.isLoggedin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update: (isLoggedin) => dispatch(LoginActions.loginStateUpdate(isLoggedin)),
        updateUser: (isSelected) => dispatch(LoginActions.updateUserLogin(isSelected))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
