export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
}
export const checkValidity = (value, validationProperties) => {
    let flag = false;
    if (validationProperties.required) {
       flag = validationProperties.required ? true : false ;
    }
    if (validationProperties.minLength) {
        flag = validationProperties.minLength<=value.length ? true : false ;
    }
    if (validationProperties.validationCriteria) {
        flag = validationProperties.validationCriteria.test(value) ? true : false;
    }
    if (validationProperties.Criteria) {
        validationProperties.Criteria.displayValue = flag ? 'none' : 'block';
    }
    return flag
}
export const loginValidity=(username,password,credentialArray)=>{
    let flag = false;
    let user;
    for(let i in credentialArray){
        if(username === credentialArray[i].username){
            flag = credentialArray[i].password === password ? true : false;
            user = credentialArray[i].username;
        }
    }
    return {flag,user}
}
export default updateObject