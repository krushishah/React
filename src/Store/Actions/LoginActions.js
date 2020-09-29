export const updateLogin = "UPDATE";
export const updateUser = "updateUser"
export function loginStateUpdate(isLoggedin){
    return {
        type : updateLogin,
        isLoggedin
    }
}
export function updateUserLogin(isSelected){
    return{
        type : updateUser,
        isSelected,
    }
}