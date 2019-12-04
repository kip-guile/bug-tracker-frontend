import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import '../../App.css';
// import './login.css';

import { Form, Icon, Input, Button, message, Typography, Spin } from 'antd';

const { Title } = Typography;

const loginURL = 'https://bug-tracker-alexander.herokuapp.com/api/auth/login';

const NormalLoginForm = (props) => {
  const [loading, setLoading] = useState(false)

  const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#BB0A21' }} spin />

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
        const details = {
            email: values.email,
            password: values.password
        }

      if (!err) {
        setLoading(true)

        axios.post(loginURL, details)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            message.success('You are logged in', 1.0)
            setLoading(false)
            props.history.push('/dashboard')
        })
        .catch(error => {
            localStorage.clear()
            setLoading(false)
            message.error(error.response.data.message || error.message, 1.0);
        });
      }
    });
  };

    const { getFieldDecorator } = props.form;


    const styles2 = {
        width: '30%',
        padding: '2em',
        margin: '3em auto',
        backgroundColor: '#D3D4D9'
    };

    return (
        <div style={styles2}>
            <div>
            <Title level={3}>Sign in</Title>
            </div>
      
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

        <Form.Item>
            <div>
          <a className="login-form-forgot" href="*">
            Forgot password?
          </a>
          </div>
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <div>
          Dont have an account? <NavLink to='/register'>
            register now!
            </NavLink>
          </div>
        </Form.Item>
      </Form>
      <Spin indicator={antIcon} spinning={loading}/>
      </div>
    );

}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;