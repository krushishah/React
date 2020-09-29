import * as formAction from '../Actions/FormActions';
import updateObject from '../../Shared/utility';
const initialState = {
    formControls: {
        firstname: {
            elementType: 'input',
            elementAttributes: {
                type: 'text',
                placeholder: 'First Name'
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
                placeholder: 'Employee ID'
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
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                elementIs: 'email',
                minLength: 1,
                validationCriteria: /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}.[a-zA-Z]{2,3}$/
            },
            isValid: false,
            touched: false
        },
        Password: {
            elementType: 'input',
            elementAttributes: {
                type: 'password',
                placeholder: 'Password'
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
};
const Details = (state = initialState, action) => {
    function update_state(state, action) {
        return updateObject(state, {
            formControls: action.formControls,
            isFormValid: action.isFormValid, 
        });
    }
    switch (action.type) {
        case formAction.update: return update_state(state, action);
        default: return state
    }
};
export default Details