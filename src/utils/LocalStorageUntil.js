export const getUserInfoFromLocalStorage = () => {
   
    try {
     let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo
} catch (error) {
    console.log(error)
}
}


export const setUserInfoInLocalStorage = (userInfo) => {
    try {
        localStorage.setItem("userInfo" , JSON.stringify(userInfo))
    } catch (error) {
        console.log(error)
    }
}