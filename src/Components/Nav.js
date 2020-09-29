import React, { Component } from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as LoginActions from '../Store/Actions/LoginActions'
class Nav extends Component {
    state = {
        Links: {
            About: {
                to: "/Container/Home/",
                ClassName: "navbar",
                activeClassName:"navbar-active"
            },
            Form: {
                to: "/Container/FormsTab",
                ClassName: "navbar",
                activeClassName:"navbar-active"
            },
            Logout : {
                to : "/",
                ClassName : "navbar-logout",
                activeClassName : "navbar-active"
            }
        }
    }
    clickHandler=(event,navElement)=>{
        let isLoggedin;
        navElement==="Logout" ? isLoggedin = false : isLoggedin=true;
        this.props.update(isLoggedin);
    }
    render() {
        const NavElementArray = [];
        for (let keys in this.state.Links) {
            NavElementArray.push({
                id: keys,
                config: this.state.Links[keys]
            })
        }
        return (
            <nav>
                <ul className="nav-links-ul">
                    {NavElementArray.map(NavElement => (
                        <NavLink
                            key={NavElement.id}
                            exact to={NavElement.config.to}
                            className={NavElement.config.ClassName}
                            activeClassName={NavElement.config.activeClassName}
                            onClick={(event)=>this.clickHandler(event,NavElement.id)}
                            >
                                <li>{NavElement.id}</li>
                        </NavLink>
                    ))
                    }
                </ul>
            </nav>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update: (isLoggedin) => dispatch(LoginActions.loginStateUpdate(isLoggedin))
    }
}
export default connect(null,mapDispatchToProps)(Nav)
