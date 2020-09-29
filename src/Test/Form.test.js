import Form from '../Container/Form';
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import formDetailsReducer from '../Store/Reducers/FormDetailsReducer';
import LoginReducer from "../Store/Reducers/LoginReducer";

configure({ adapter: new Adapter() });

let formWrapper;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({loginReducer:LoginReducer,formDetailsReducer:formDetailsReducer})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
describe('<Form test/>', () => {
    beforeEach(() => {
        formWrapper = mount(<Provider store={store}>   // Provides the store to your App
            <MemoryRouter><Form/></MemoryRouter>
        </Provider>);
    });

    it('No of inputs in Form', () => {
        expect(formWrapper.find("Input")).toHaveLength(5);
    });
});