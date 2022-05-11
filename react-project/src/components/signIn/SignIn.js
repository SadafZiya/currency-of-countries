import {Card, Form, Input, Button} from 'antd';
import {signInService} from '../../services/serviceInfo'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../design/signIn/index.css'

const SignIn = (props) => {
    const navigate = useNavigate();
    const {setIsLoginForm, loginInfo} = props
    const [message, setMessage] = useState(null)
    const [messageColor, setMessageColor] = useState('red')

    useEffect(() => {
        if (loginInfo?.email) {
            setMessage("You signed Up successfully ")
            setMessageColor("green")
        }
    })
    const onFinish = async (signInFormData) => {
        let signInResult = await signInService(signInFormData)
        if (signInResult.success) navigate('/searchCountries')
        else {
            setMessage(signInResult.data)
            setMessageColor('red')
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={'main-div-login'}>
            <Card className={'sign-in-up-card'} title="Sign in">
                <Form
                    name="login-form"
                    labelCol={{
                        span: 5
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{email: loginInfo.email, password: loginInfo.password}}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <label>
                            You are New? <a href={'#'} onClick={() => setIsLoginForm(false)}>Sign Up</a>
                        </label>
                    </Form.Item>
                    {message && <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <label style={{color: messageColor}}>
                            {message}
                        </label>
                    </Form.Item>}
                </Form>
            </Card>
        </div>
    );
};

export default SignIn;
