import * as LoginActions from '../Actions/LoginActions'
import updateObject from '../../Shared/utility';

export const loginCredentials = {
    Credentials: {
        user0: {
            username: "Krushi",
            password: "Krushi@12",
            email: "krushi@gmail.com",
            ID: "PP1234"
        },
        user1: {
            username: "Deep",
            password: "Deep@1234",
            email: "Deep@gmail.com",
            ID: "PP4321"
        }
    },
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
    isSelected:"",
    isLoggedin: false,
}
const loginDetails = (state = loginCredentials, action) => {
    function loginStateUpdate(state, action) {
        return updateObject(state, {
            isLoggedin: action.isLoggedin,
        });
    }
    function updateUserLogin(state,action){
        return updateObject(state,{
            isSelected : action.isSelected
        })
    }
    switch (action.type) {
        case LoginActions.updateLogin: return loginStateUpdate(state, action)
        case LoginActions.updateUser : return updateUserLogin(state,action)
        default: return state
    }
};
export default loginDetails
