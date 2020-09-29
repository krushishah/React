import { loginValidity } from '../Shared/utility';
test('should validate login credentials', () => {
    let value={loginControls: {
        userName: {
            elementType: 'input',
            elementAttributes: {
                type: 'text',
                placeholder: 'User Name'
            },
            value: 'Krushi',
        },
        password: {
            elementType: 'input',
            elementAttributes: {
                type: 'password',
                placeholder: 'Password',
            },
            value: 'Krushi@12',
        },
    },}
    let credentials = {
        Credentials: {
            user0: {
                username: "Krushi",
                password: "Krushi@12",
                email: "krushi@gmail.com",
                ID: "PP1234",
                isSelected: false,
            },
            user1: {
                username: "Deep",
                password: "Deep@1234",
                email: "Deep@gmail.com",
                ID: "PP4321",
                isSelected: false,
            }
        }
    }
    expect(loginValidity(value.loginControls.userName.value,value.loginControls.password.value,credentials.Credentials)).toEqual({"flag":true,"user":"Krushi"});
    value.loginControls.userName.value = "Ksadiu";
    expect(loginValidity(value.loginControls.userName.value,value.loginControls.password.value,credentials.Credentials)).toEqual({"flag":false,"user":undefined});
})
