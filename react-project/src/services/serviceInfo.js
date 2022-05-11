import { fetchDataLogin, fetchDataGraphql } from "./fetchDataUils";
import { setToken } from "../utils/localStorages";

export const signInService = async ({ email, password }) => {
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
      email: email,
      password: password,
    },
  };
  let loginInfo = await fetchDataLogin(data);
  if (loginInfo?.data?.login?.token) {
    setToken(loginInfo.data.login.token);
    return { success: true, data: loginInfo.data.login };
  }
  return { success: false, data: loginInfo?.errors[0]?.message };
};

export const signUpService = async ({ email, password, confirmPassword }) => {
  let data = {
    query: `            
            query signUp($email : String!,$password:String!,$confirmPassword:String!){
               signUp(email:$email,password:$password,confirmPassword:$confirmPassword)
            }            
            `,
    variables: {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
  };
  let signUpInfo = await fetchDataGraphql(data);
  if (signUpInfo?.errors) {
    return { success: false, message: signUpInfo?.errors[0]?.message };
  }
  return { success: true };
};

export const signOutService = async () => {
  let data = {
    query: `            
            {
               signOut
            }            
            `,
  };
  let signOutInfo = await fetchDataGraphql(data);
  return signOutInfo?.data?.signOut;
};

export const fetchCountryList = async (searchCountryName) => {
  let data = {
    query: `            
              query getCountriesByName($searchCountryName : String){
               getCountries(name:$searchCountryName){
                        fullName
                        population
                        currencies{
                          currency
                          name
                          exchangeRate
                        }
              }
            }            
            `,
    variables: {
      searchCountryName: searchCountryName,
    },
  };
  let countryListResult = await fetchDataGraphql(data);
  if (countryListResult?.errors) {
    return { success: false, message: countryListResult?.errors[0]?.message };
  }
  return { success: true, data: countryListResult.data.getCountries };
};
