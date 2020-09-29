import React from 'react';
import App,{route} from '../App';
import {configure, mount } from 'enzyme';
import {MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import formDetailsReducer from '../Store/Reducers/FormDetailsReducer'
import LoginReducer from "../Store/Reducers/LoginReducer"

configure({ adapter: new Adapter() });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({loginReducer:LoginReducer,formDetailsReducer:formDetailsReducer})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
let wrapper;
describe('<App/>', () => {
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>   // Provides the store to your App
                <MemoryRouter><App /></MemoryRouter>
            </Provider>
        );
    });

   it('no of routes to be 2', () => {
        //for this case to be true , change value of isLoggedin =  false  in LoginReducer.js;
        let routeCheck = route.props.children;
        expect(routeCheck).toHaveLength(2);
    });

    it('no of routes to be 4',() => {
        //for this case to be true , change value of isLoggedin =  true  in LoginReducer.js;
        let routeCheck = route.props.children;
        expect(routeCheck).toHaveLength(4);
    });
});