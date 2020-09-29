import { checkValidity } from '../Shared/utility'
test('validity test for the form inputs', () => {
    //Assumption array if update value array update expectedValue Array too.
    let value = ["K","KR","S","SH","pp213","pp1234","krushI@gmailas","krushi@gmail.com","KRusHI@sadw","Krushi@772"];
    let validationProperties =[{required: true,elementIs: 'firstname',minLength: 2,},
                               {required: true,elementIs: 'firstname',minLength: 2,},
                               {required: true,elementIs: 'lastname',minLength: 2,},
                               {required: true,elementIs: 'lastname',minLength: 2,},
                               {required: true,elementIs: 'ID',minLength: 1,validationCriteria: /^[p]{2,2}[0-9]{4,4}$/},
                               {required: true,elementIs: 'ID',minLength: 1,validationCriteria: /^[p]{2,2}[0-9]{4,4}$/},
                               {required: true,elementIs: 'email',minLength: 1,validationCriteria: /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/},
                               {required: true,elementIs: 'email',minLength: 1,validationCriteria: /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/},
                               {required: true,elementIs: 'password', minLength: 1,validationCriteria: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,Criteria: {
                                    displayValue: 'none',
                                    displayData: 'Aleast 8 characters including \n Uppercase \n lowercase \n Number \n Special Characters'
                                }},
                                {required: true,elementIs: 'password',minLength: 1,validationCriteria: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,Criteria: {
                                        displayValue: 'none',
                                        displayData: 'Aleast 8 characters including \n Uppercase \n lowercase \n Number \n Special Characters'
                                    }}];
    let expectedValue = [false,false,false,true,false,true,false,true,false,true];
    for(let i = 0 ; i < value.length ;i++){
        expect(checkValidity(value[i],validationProperties[i])).toBe(expectedValue[i]);
    }
});