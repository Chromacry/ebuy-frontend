export const getUserInfoFromLocalStorage = () => {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo
    
}

export const setUserInfoInLocalStorage = (userInfo) => {
    try {
        localStorage.setItem("userInfo" , JSON.stringify(userInfo))
    } catch (error) {
        console.log(error)
    }
}