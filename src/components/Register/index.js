import React, {useState} from 'react';
import axios from 'axios';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Button,
    message,
    Select,
  } from 'antd';

  const { Option } = Select;

  const SignUpURL = 'https://bug-tracker-alexander.herokuapp.com/api/auth/register';
  
  const RegistrationForm = (props) => {
      const [confirmDirty, setConfirmDirty] = useState(false)
  
    const handleSubmit = e => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
        const newUser = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            position: values.position
        }
        if (!err) {
          axios.post(SignUpURL, newUser)
          .then(res => {
              message.success('Sign up successful', 1.0)
              props.form.resetFields()
              props.history.push('/')
          })
          .catch(error => {
              localStorage.clear();
              alert(error.message);
          })
        }
      });
    };
  
    const handleConfirmBlur = e => {
      const { value } = e.target;
      setConfirmDirty(!!value)
    };
  
    const compareToFirstPassword = (rule, value, callback) => {
      const { form } = props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    const validateToNextPassword = (rule, value, callback) => {
      const { form } = props;
      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
  
      const { getFieldDecorator } = props.form;
  
      // const formItemLayout = {
      //   labelCol: {
      //     xs: { span: 20 }, //24
      //     sm: { span: 10 }, //8
      //   },
      //   wrapperCol: {
      //     xs: { span: 15 }, //24
      //     sm: { span: 8 }, //16
      //   },
      // };
      // const tailFormItemLayout = {
      //   wrapperCol: {
      //     xs: {
      //       span: 24, //24
      //       offset: 0,
      //     },
      //     sm: {
      //       span: 4, //16
      //       offset: 10, //8
      //     },
      //   },
      // };

      const styles2 = {
        width: '30%',
        padding: '2em',
        margin: '3em auto',
        backgroundColor: '#D3D4D9'
    };

    const styles1 = {
      margin: '0 auto'
    }
  
      return (
        <div style={styles2}>
            <div style={styles1}>
                <h2>Sign Up</h2>
            </div>
            {/* {...formItemLayout} */}
            <Form onSubmit={handleSubmit}>
            <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                rules: [
                    {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                    },
                    {
                    required: true,
                    message: 'Please input your E-mail!',
                    },
                ],
                })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                rules: [
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                    {
                    validator: validateToNextPassword,
                    },
                ],
                })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                rules: [
                    {
                    required: true,
                    message: 'Please confirm your password!',
                    },
                    {
                    validator: compareToFirstPassword,
                    },
                ],
                })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
                label={
                <span>
                    First Name&nbsp;
                    <Tooltip title="Your First Name?">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                }
            >
                {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                })(<Input />)}
            </Form.Item>

            <Form.Item
                label={
                <span>
                    Last Name&nbsp;
                    <Tooltip title="Your Last Name?">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                }
            >
                {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
                })(<Input />)}
            </Form.Item>

            <Form.Item label="Select" hasFeedback>
            {getFieldDecorator('position', {
                rules: [{ required: true, message: 'Please select your positon!' }],
            })(
                <Select placeholder="Please select a position">
                <Option value="manager">Manager</Option>
                <Option value="developer">Developer</Option>
                </Select>,
            )}
            </Form.Item>

            {/* {...tailFormItemLayout} */}

            <Form.Item >
                <Button type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
            </Form>
        </div>
      );
  }
  
  const Registration = Form.create({ name: 'register' })(RegistrationForm);

export default Registration;