import React from 'react';
import {useSelector} from 'react-redux';
import 'antd/dist/antd.css';
import { Modal, Form, Select } from 'antd'

const {Option} = Select


const AssignBug = (props) => {

    const allUsers = useSelector(state => state.users)
    const sort = allUsers.filter(user =>
        user.position === 'Developer'
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
          title="Select Dev to assgn bug to"
          okText="Done"
          onCancel={props.onCancel}
          onOk={props.onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Developer">
              {props.form.getFieldDecorator('developer', {
                rules: [{ required: true, message: 'Select Developer' }],
              })(<Select
                mode="default"
                style={{ width: '50%' }}
                placeholder="Please select developer"
                onChange={handleChange}
                >
                {roll}
                </Select>)}
            </Form.Item>

          </Form>
        </Modal>
    )
}

const BugAssignment = Form.create({ name: 'normal_login' })(AssignBug);

export default BugAssignment;