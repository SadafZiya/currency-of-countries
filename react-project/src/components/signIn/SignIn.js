import './signIn.css'
import {Card, Form, Input, Button} from 'antd';
import {signInService} from '../../services/serviceInfo'

const SignIn = (props) => {
    const {setIsLoginForm} = props
    const onFinish = async (signInFormData) => {
        await signInService(signInFormData)
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
                </Form>
            </Card>
        </div>
    );
};

export default SignIn;
