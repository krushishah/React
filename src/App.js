import React from 'react';
import './App.css';
import Home from './Container/Home'
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Container/Login';
import { connect } from 'react-redux';
import FormsTab from './Container/FormsTab';
let route;
function App(props) {
  route = (
    <Switch>
      <Route exact path="/" component={Login} />
      <Redirect to="/"/>
    </Switch>);
  if (props.isLoggedin) {
    route = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Container/Home" component={Home} />
        <Route exact path="/Container/FormsTab" component={FormsTab} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div className="App">
      {route}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedin: state.loginReducer.isLoggedin || false
  }
}
export {route};
export default connect(mapStateToProps)(App);