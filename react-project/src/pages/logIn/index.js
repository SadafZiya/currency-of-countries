import {useState} from "react";
import '../../components/signIn/signIn.css'
import SignUp from "../../components/signIn/SignUp";
import SignIn from "../../components/signIn/SignIn";


const LogIn = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)

    return (
        <div className={'main-div-login'}>
            {isLoginForm ?
                <SignIn setIsLoginForm={setIsLoginForm}/>
                :
                <SignUp setIsLoginForm={setIsLoginForm}/>
            }
        </div>
    );
};

export default LogIn ;
