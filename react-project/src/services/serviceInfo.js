import {fetchDataLogin, fetchDataGraphql} from './fetchDataUils'

export const signInService = async ({email, password}) => {
    let data = {
        query: `            
            query login($email : String!,$password:String!){
               login(email:$email,password:$password){
                 email
                 token
              }
            }            
            `,
        variables: {
            'email': email,
            'password': password,
        }
    };
    let loginInfo = await fetchDataLogin(data)
    if (loginInfo?.data?.login?.token) {
        localStorage.setItem('TOKEN', JSON.stringify(loginInfo.data.login.token))
        return {success: true, data: loginInfo.data.login}
    }
    return {success: false, data: loginInfo?.errors[0]?.message}
}

export const signUpService = async ({email, password, confirmPassword}) => {
    let data = {
        query: `            
            query signUp($email : String!,$password:String!,$confirmPassword:String!){
               signUp(email:$email,password:$password,confirmPassword:$confirmPassword)
            }            
            `,
        variables: {
            'email': email,
            'password': password,
            'confirmPassword': confirmPassword
        }
    };
    let signUpInfo = await fetchDataGraphql(data)
    if (signUpInfo?.errors) {
        return {success: false, message: signUpInfo?.errors[0]?.message}
    }
    return {success: true}
}
export const signOutService = async () => {
    let data = {
        query: `            
            {
               signOut
            }            
            `
    };
    let signOutInfo = await fetchDataLogin(data)
    return signOutInfo
}
