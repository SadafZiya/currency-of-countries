const {AuthenticationError} = require("apollo-server");
const jwt = require('jsonwebtoken')
const SEKRET_KEY = "anfs#@dst$*dst&twa"
const USER_LIST =
    [
    {
        id: 1,
        email: "zia.s69@gmail.com",
        password: "123456789",
        token: null
    }
]


const createToken = async ({email, password}) => {
    let token = await jwt.sign({email, password}, SEKRET_KEY)
    return token
}
const checkToken = async (req) => {
    let token = req.headers.token
    if (token) {
        try {
            let findUser = USER_LIST.find(user => user.token == token)
            return findUser ? await jwt.verify(token, SEKRET_KEY) : null
        } catch (e) {
            throw new AuthenticationError("Your token expired, login again")
        }
    } else {
        return null
    }
}
const loginUser = async ({email, password}) => {
    let findUser = USER_LIST.find(user => user.email == email && user.password == password)
    if (findUser) {
        let token = await createToken({email, password})
        findUser.token = token
        return {email, token}
    }
    throw new Error("Your Email Or Password is Wrong,Please check it out!")
}

const registerUser = ({email, password, confirmPassword}) => {
    if (confirmPassword != password) throw new Error("Password and confirm password are not equal")

    let findUser = USER_LIST.find(user => user.email == email)
    if (!findUser) {
        let newUser = {
            id: USER_LIST.length + 1,
            email,
            password,
            token: null
        }
        USER_LIST.push(newUser)
        return true
    }
    throw new Error("This Email has an account")

}

const logOutUser = async ({email }) => {
    let findUser = USER_LIST.find(user => user.email == email )
    if (findUser) {
        findUser.token = null
        return true
    }
    throw new Error("There is no such token exist")
}

const getAllUser = () => USER_LIST

module.exports = {checkToken, loginUser, registerUser, logOutUser, getAllUser}
