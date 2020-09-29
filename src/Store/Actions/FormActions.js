export const update = "UPDATE";
export function update_state(formControls,isFormValid,isLoggedin){
    return {
        type : update,
        formControls,
        isFormValid,
        isLoggedin
    }
}