import React, { Component } from 'react'
import './home.css'
import Nav from '../Components/Nav'
import { connect } from 'react-redux'
class Home extends Component {
    render() {
        let name, email, empID;
        for (let i in this.props.loginCredentials) {
            if (this.props.isSelected === this.props.loginCredentials[i].username) {
                name = this.props.loginCredentials[i].username;
                email = this.props.loginCredentials[i].email;
                empID = this.props.loginCredentials[i].ID;
            }
        }
        let showdetails = (
            <div>Name : {name}<br />Employee ID : {empID}<br />Email : {email}</div>
        );
        return (
            <div>
                <Nav/>
                <div className="home">
                    <h1 className="header">HOME</h1>
                    <div className="details">{showdetails}</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loginCredentials: state.loginReducer.Credentials,
        isLoggedin: state.loginReducer.isLoggedin,
        isSelected: state.loginReducer.isSelected
    }
}
export default connect(mapStateToProps)(Home)