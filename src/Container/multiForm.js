import React, { Component } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button'
import updateObject, { checkValidity } from '../Shared/utility';
import './multiForm.css'
import Span from '../Components/Span'
export class MultiForm extends Component {
    state = {
        form1: {
            formControl: {
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
                    touched: false,
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
            },
            isFirst: true,
            isStepValid: false,
            stepClassName: "step active"
        },
        form2: {
            formControl: {
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
            },
            isStepValid: false,
            stepClassName: "step"
        },
        form3: {
            formControl: {
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
                },
            },
            isStepValid: false,
            isLast: true,
            stepClassName: "step"
        },
        formArray: ["form1", "form2", "form3"],
        form: "form1",
        isFormValid: false,
    }
    submitHandler = () => {
        if (this.state.isFormValid) {
            alert("Hey " + this.state.form1.formControl.firstname.value + " ,Form is submitted");
        }
    }
    nextHandler = () => {
        const updateClass = updateObject(this.state[this.state.form], {
            stepClassName: this.state[this.state.form].stepClassName.replace(" active", "")
        })
        this.setState({
            [this.state.form]: updateClass,
        })
        let formValue = "";
        for (let i = 0;i < this.state.formArray.length;i++) {
            if (this.state.form === this.state.formArray[i]) {
                if (this.state.formArray[i + 1]) {
                    formValue = this.state.formArray[i + 1];
                }
                else {
                    formValue = this.state.formArray[i];
                }
            }
        }
        let isFormValid = true;
        for (let inputIdentifier in this.state) {
            if (this.state[inputIdentifier].formControl) {
                isFormValid = this.state[inputIdentifier].isStepValid && isFormValid;
            }
        }
        this.setState({
            form: formValue,
            isFormValid: isFormValid,
        });
        const updateClassName = updateObject(this.state[formValue], {
            stepClassName: this.state[formValue].stepClassName + " active"
        })
        this.setState({
            [formValue]: updateClassName,
        })
    }
    previousHandler = () => {
        const updateClass = updateObject(this.state[this.state.form], {
            stepClassName: this.state[this.state.form].stepClassName.replace(" active", "")
        })
        this.setState({
            [this.state.form]: updateClass,
        })
        let formValue = "";
        for (let i = 0;i < this.state.formArray.length;i++) {
            if (this.state.form === this.state.formArray[i]) {
                if (this.state.formArray[i - 1]) {
                    formValue = this.state.formArray[i - 1];
                }
                else {
                    formValue = this.state.formArray[i];
                }
            }
        }
        let isFormValid = true;
        for (let inputIdentifier in this.state) {
            if (this.state[inputIdentifier].formControl) {
                isFormValid = this.state[inputIdentifier].isStepValid && isFormValid;
            }
        }
        this.setState({
            form: formValue,
            isFormValid: isFormValid,
        });
        const updateClassName = updateObject(this.state[formValue], {
            stepClassName: this.state[formValue].stepClassName + " active"
        })
        this.setState({
            [formValue]: updateClassName,
        });
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state[this.state.form].formControl[inputIdentifier], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, this.state[this.state.form].formControl[inputIdentifier].validation),
            touched: true,
        });
        const updatedControls = updateObject(this.state[this.state.form].formControl, {
            [inputIdentifier]: updatedFormElement,
        });
        let isStepValid = true;
        for (let inputIdentifier in updatedControls) {
            isStepValid = updatedControls[inputIdentifier].isValid && isStepValid;
        }
        let stepClassName = "step";
        stepClassName = isStepValid ? "step finish active" : "step active";
        const updatedform = updateObject(this.state[this.state.form], {
            formControl: updatedControls,
            isStepValid: isStepValid,
            stepClassName: stepClassName,
        })
        let isFormValid = true;
        for (let inputIdentifier in this.state) {
            if (this.state[inputIdentifier].formControl) {
                isFormValid = this.state[inputIdentifier].isStepValid && isFormValid;
            }
        }
        this.setState({
            [this.state.form]: updatedform,
            isFormValid: isFormValid,
        });
    }
    spanHandler = (event, formIdentifier) => {
        if (this.state.form !== formIdentifier) {
            const updateClass = updateObject(this.state[this.state.form], {
                stepClassName: this.state[this.state.form].stepClassName.replace(" active", ""),
            })
            this.setState({
                [this.state.form]: updateClass,
            })
        }
        if (!this.state[formIdentifier].stepClassName.includes(" active")) {
            const updateClassName = updateObject(this.state[formIdentifier], {
                stepClassName: this.state[formIdentifier].stepClassName + " active"
            })
            let isFormValid = true;
            for (let inputIdentifier in this.state) {
                if (this.state[inputIdentifier].formControl) {
                    isFormValid = this.state[inputIdentifier].isStepValid && isFormValid;
                }
            }
            this.setState({
                [formIdentifier]: updateClassName,
                form: formIdentifier,
                isFormValid : isFormValid,
            })
        }
    }
    render() {
        const formElementArray = [];
        for (let key in this.state[this.state.form].formControl) {
            formElementArray.push({
                id: key,
                config: this.state[this.state.form].formControl[key],
            })
        }
        const stepArray = [];
        for (let inputIdentifier in this.state.formArray) {
            stepArray.push({
                id: this.state.formArray[inputIdentifier],
                config: this.state[this.state.formArray[inputIdentifier]].stepClassName,
            })
        }
        let buttons = (this.state[this.state.form].isFirst ? (<div className="form-button-right">
            <Button className="multi-form-Button-right" disabled={!this.state[this.state.form].isStepValid} label='next' onClick={this.nextHandler} />
        </div>)
            : this.state[this.state.form].isLast ? (<div>
                <span style={{ display: this.state.form3.formControl.Password.validation.Criteria.displayValue }}>{this.state.form3.formControl.Password.validation.Criteria.displayData}</span>
                <div className="form-button-left">
                    <Button className="multi-form-Button-left" label='Previous' onClick={this.previousHandler} />
                </div>
                <div className="form-button-right">
                    <Button className="multi-form-Button-right" disabled={!this.state.isFormValid} label='Submit' onClick={this.submitHandler} />
                </div>
            </div>) : (<div>
                <div className="form-button-left">
                    <Button className="multi-form-Button-left" label='Previous' onClick={this.previousHandler} />
                </div>
                <div className="form-button-right">
                    <Button className="multi-form-Button-right" disabled={!this.state[this.state.form].isStepValid} label='Next' onClick={this.nextHandler} />
                </div>
            </div>))
        let multiform = (
            <div className="form">
                <h2 className="Header">Welcome To PaperPlane Solutions</h2>
                <div className="stepdiv">
                    {stepArray.map(formStep => (
                        <Span key={formStep.id} id={formStep.id} className={formStep.config} onClick={(event) => this.spanHandler(event, formStep.id)} />
                    ))}
                </div>
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
                {buttons}
            </div>
        );
        return (
            <div className="form">
                {multiform}
            </div>
        )
    }
}
export default MultiForm