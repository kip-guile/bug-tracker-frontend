import React, {useCallback, useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { Button, message } from 'antd'
import * as creators from '../../../state/actionCreators'
import CreateProject from '../../../Modals/addProject'
import AxiosAuth from '../../../AxiosAuth/AxiosAuth'

const SideProfile = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [formRef, setFormRef] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(creators.getUsers())
    }, [dispatch])

    const showModal = () => {
        setIsVisible(true)
    }
  
    const handleCancel = () => {
        setIsVisible(false)
    }

    const handleCreate = () => {
        formRef.validateFields((err, values) => {
            if (err) {
              return;
            }

            const manager = parseInt(values.manager[0])
  
            const details = {
              title: values.title,
              frontend: values.frontend,
              backend: values.backend,
              client: values.client,
              description: values.description,
              user_id: manager
          }

          AxiosAuth()
            .post('http://localhost:8000/api/projects/', details)
            .then(res => {
                formRef.resetFields()
                message.info('New Project Created')
                dispatch(creators.getProjects())
                setIsVisible(false)
            })
            .catch(error => {
                message.error(error.message)
            })
        })
    }

    const saveFormRef = useCallback(node => {
        if (node !== null) {
            setFormRef(node)
        }
      }, [])


    const imageStyle = {
        paddingTop: '20%',
        borderRadius: '50%',
        paddingBottom: '1em',
        width: '100px',
        height: '100%'
      }

    return (
        <div style={{ textAlign: 'center' }}>
            <img
            src="https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Ladybug-512.png"
            alt="icon"
            style={imageStyle}
            />
            <br/>
            <Button
            onClick={showModal}
            style={{
                background: '#BB0A21',
                border: 'none',
                color: 'white',
                marginTop: '10%'
                }}>
                Create Project +
            </Button>
            <CreateProject
            ref={saveFormRef}
            visible={isVisible}
            onCancel={handleCancel}
            onCreate={handleCreate}
            />
        </div>
    )
}

export default SideProfile