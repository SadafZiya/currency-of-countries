import {useState} from "react";
import '../../design/signIn/index.css'
import SignUp from "../../components/signIn/SignUp";
import SignIn from "../../components/signIn/SignIn";


const LogIn = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [loginInfo, setLoginInfo] = useState({email: null, password: null})

    const signeInAfterSignUp = (signUpData) => {
        setLoginInfo(signUpData ?? loginInfo)
        setIsLoginForm(true)
    }
    return (
        <div className={'main-div-login'}>
            {isLoginForm ?
                <SignIn setIsLoginForm={setIsLoginForm} loginInfo={loginInfo}/>
                :
                <SignUp setIsLoginForm={signeInAfterSignUp}/>
            }
        </div>
    );
};

export default LogIn;
