import React, { Component } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { updateObject, checkValidity } from '../Shared/utility'
import { connect } from 'react-redux'
import * as FormActions from '../Store/Actions/FormActions'
import './Form.css'
class Form extends Component {
    state = {
        formControls: {
            firstname: {
                elementType: 'input',
                elementAttributes: {
                    type: 'text',
                    placeholder: 'First Name',
                    className: 'form-Input'
                },
                value: '',
                validation: {
                    required: true,
                    elementIs: 'firstname',
                    minLength: 2,
                },
                isValid: false,
                touched: false
            },
            Lastname: {
                elementType: 'input',
                elementAttributes: {
                    type: 'text',
                    placeholder: 'Last Name',
                    className: 'form-Input'
                },
                value: '',
                validation: {
                    required: true,
                    elementIs: 'lastname',
                    minLength: 2
                },
                isValid: false,
                touched: false
            },
            ID: {
                elementType: 'input',
                elementAttributes: {
                    type: 'text',
                    placeholder: 'Employee ID',
                    className: 'form-Input'
                },
                value: '',
                validation: {
                    required: true,
                    elementIs: 'ID',
                    minLength: 1,
                    validationCriteria: /^[p]{2,2}[0-9]{4,4}$/
                },
                isValid: false,
                touched: false
            },
            Email: {
                elementType: 'input',
                elementAttributes: {
                    type: 'email',
                    placeholder: 'Email',
                    className: 'form-Input'
                },
                value: '',
                validation: {
                    required: true,
                    elementIs: 'email',
                    minLength: 1,
                    validationCriteria: /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/
                },
                isValid: false,
                touched: false
            },
            Password: {
                elementType: 'input',
                elementAttributes: {
                    type: 'password',
                    placeholder: 'Password',
                    className: 'form-Input'
                },
                value: '',
                validation: {
                    required: true,
                    elementIs: 'password',
                    minLength: 1,
                    validationCriteria: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    Criteria: {
                        displayValue: 'none',
                        displayData: 'Aleast 8 characters including \n Uppercase \n lowercase \n Number \n Special Characters'
                    }
                },
                isValid: false,
                touched: false
            }
        },
        isFormValid: false,
    }
    submitHandler = (event) => {
        alert('Hey ' + this.state.formControls.firstname.value + ', Form is submited');
        this.props.update(this.state.formControls, this.state.isFormValid, this.props.isLoggedin);
        event.preventDefault();
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.formControls[inputIdentifier], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, this.state.formControls[inputIdentifier].validation),
            touched: true,
        });
        const updatedControls = updateObject(this.state.formControls, {
            [inputIdentifier]: updatedFormElement
        });
        let isFormValid = true;
        for (let inputIdentifier in updatedControls) {
            isFormValid = updatedControls[inputIdentifier].isValid && isFormValid;
        }
        this.setState({
            formControls: updatedControls,
            isFormValid: isFormValid,
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.formControls) {
            formElementArray.push({
                id: key,
                config: this.state.formControls[key]
            })
        }
        let Completeform = (
            <div className="form">
                <form onSubmit={this.submitHandler}>
                    <h2 className="HeaderForm">Welcome to PaperPlane Solutions</h2>
                    <div>
                        {formElementArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                isValid={formElement.config.isValid}
                                isTouched={formElement.config.touched}
                                elementConfig={formElement.config.elementAttributes}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                className={formElement.config.touched ? formElement.config.isValid ? "form-Input" : "form-Input-error" : "form-Input"}
                            />
                        ))
                        }
                        <span style={{ display: this.state.formControls.Password.validation.Criteria.displayValue }}>{this.state.formControls.Password.validation.Criteria.displayData}</span>
                        <Button label='Submit' disabled={!this.state.isFormValid} className="form-button"></Button>
                    </div>
                </form>
            </div>
        );
        return (
            <div>
                {Completeform}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedin: state.loginReducer.isLoggedin,
        formControls: state.formDetailsReducer.formControls,
        isFormValid: state.formDetailsReducer.isFormValid
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update: (formControls, formIsValid, isLoggedin) => dispatch(FormActions.update_state(formControls, formIsValid, isLoggedin))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form)