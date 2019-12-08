import React from 'react';
import {useSelector} from 'react-redux';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd'

const {Option} = Select


const CreateProject = (props) => {

    const allUsers = useSelector(state => state.users)
    const sort = allUsers.filter(user =>
        user.position === 'Manager'
    )
    
    const roll = sort.map(user => 
        <Option key={user.id}>{<p>{user.name}</p>}</Option>)


    let names = []

    function handleChange(value) {
        names.push(value)
        return names
      }

    return (
      <Modal
          visible={props.visible}
          title="Enter Project details"
          okText="Done"
          onCancel={props.onCancel}
          onOk={props.onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Title">
              {props.form.getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of the project!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Frontend">
              {props.form.getFieldDecorator('frontend', {
                rules: [{ required: true, message: 'Frontend technology?' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Backend">
              {props.form.getFieldDecorator('backend', {
                rules: [{ required: true, message: 'Backend technology?' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Client">
              {props.form.getFieldDecorator('client', {
                rules: [{ required: true, message: 'Client Name' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Description">
              {props.form.getFieldDecorator('description', {
                rules: [{ required: true, message: 'project description?' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Manager">
              {props.form.getFieldDecorator('manager', {
                rules: [{ required: true, message: 'Select Manager' }],
              })(<Select
                mode="multiple"
                style={{ width: '50%' }}
                placeholder="Please select user"
                onChange={handleChange}
                >
                {roll}
                </Select>)}
            </Form.Item>
          </Form>
        </Modal>
    )
}

const AddProject = Form.create({ name: 'normal_login' })(CreateProject);

export default AddProject;