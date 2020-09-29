import React, { Component } from 'react'
import Nav from '../Components/Nav'
import Form from './Form'
import Button from '../Components/Button'
import './FormsTab.css'
import MultiForm from './multiForm'
import updateObject from '../Shared/utility'
export class FormsTab extends Component {
    state = {
        forms: {
            completeform: {
                name: "Complete form",
                displayForm: "Complete form",
                className: "tablink-active"
            },
            MultiTabform: {
                name: "Multi Tab",
                displayForm: "MultiTab form",
                className: "tablink"
            },
        },
        tabform: "completeform"
    }
    displayForm = (event, inputIdentifier) => {
        let tabform = inputIdentifier;
        if(this.state.tabform !== tabform){
            let updatedform = updateObject(this.state.forms[inputIdentifier], {
                className: "tablink-active"
            })
            let classnameUpdate = updateObject(this.state.forms[this.state.tabform], {
                className: "tablink",
            });
            let updatedelement = updateObject(this.state.forms, {
                [inputIdentifier]: updatedform,
                [this.state.tabform]: classnameUpdate,
            })
            this.setState({
                forms: updatedelement,
                tabform: tabform,
            });
        }
    }
    render() {
        const tabElementArray = [];
        for (let key in this.state.forms) {
            tabElementArray.push({
                id: key,
                config: this.state.forms[key]
            })
        }
        let tabForm = (
            <div className="tabform">
                {tabElementArray.map(formElement => (
                    <Button key={formElement.id} label={formElement.config.displayForm} className={formElement.config.className} onClick={(event) => this.displayForm(event, formElement.id)}></Button>
                ))
                }
            </div>
        );
        tabForm = this.state.tabform === "completeform" ? (<div className="tabform">
            {tabElementArray.map(formElement => (
                <Button key={formElement.id} label={formElement.config.displayForm} className={formElement.config.className} onClick={(event) => this.displayForm(event, formElement.id)}></Button>
            ))
            }
            <Form className="form"/>
        </div>) : (<div className="tabform">
            {tabElementArray.map(formElement => (
                <Button key={formElement.id} label={formElement.config.displayForm} className={formElement.config.className} onClick={(event, inputIdentifier) => this.displayForm(event, formElement.id)}></Button>
            ))
            }
            <MultiForm  classNam="multiform"/>
        </div>)
        return (
            <div>
                <Nav />
                {tabForm}
            </div>
        )
    }
}
export default FormsTab