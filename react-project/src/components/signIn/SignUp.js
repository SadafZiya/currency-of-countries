import "../../design/signIn/index.css";
import React, { useState } from "react";
import { Card, Form, Input, Button } from "antd";
import { signUpService } from "../../services/serviceInfo";

const SignUp = (props) => {
  const { setIsLoginForm } = props;
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("red");

  const onFinish = async (signUpFormData) => {
    let signUpResult = await signUpService(signUpFormData);
    if (signUpResult.success) setIsLoginForm(signUpFormData);
    else setMessage(signUpResult.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={"main-div-login"}>
      <Card className={"sign-in-up-card"} title="Sign up">
        <Form
          name="login-form"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
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
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password !",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <label>
              You have Account?{" "}
              <a href={"#"} onClick={() => setIsLoginForm(null)}>
                Sign In
              </a>
            </label>
          </Form.Item>
          {message && (
            <Form.Item
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <label style={{ color: messageColor }}>{message}</label>
            </Form.Item>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
