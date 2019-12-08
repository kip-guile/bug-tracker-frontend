import React, {useState, useCallback} from 'react'
import {useDispatch} from 'react-redux';
import { Table, Input, Button, Icon, Divider, message } from 'antd';
import Highlighter from 'react-highlight-words';
import CreateProject from '../../Modals/addProject'
import * as creators from '../../state/actionCreators'
import AxiosAuth from '../../AxiosAuth/AxiosAuth'

const ProjectList = (projects) => {
    const [searchText, setSeacrhText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [searchInput, setSearchInput] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [formRef, setFormRef] = useState(null)
    const [projectId, setProjectId] = useState('')

    const dispatch = useDispatch()

    const showModal = (id) => {
        setProjectId(id)
        setIsVisible(true)
    }
  
    const handleCancel = () => {
        setIsVisible(false)
    }

    const tref = useCallback(node => {
        setSearchInput(node)
    }, [])

    const saveFormRef = useCallback(node => {
        if (node !== null) {
            setFormRef(node)
        }
      }, [])

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
          .put(`http://localhost:8000/api/projects/${projectId}`, details)
          .then(res => {
              formRef.resetFields()
              message.info('Project Updated')
              dispatch(creators.getProjects())
              setIsVisible(false)
          })
          .catch(error => {
              message.error(error.message)
          })
        })
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={tref}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select());
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      })

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchedColumn(dataIndex)
        setSeacrhText(selectedKeys[0])
      };
    
    const handleReset = clearFilters => {
    clearFilters();
    setSeacrhText('')
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps('id'),
          },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: '13%',
          ...getColumnSearchProps('title'),
        },
        {
          title: 'Frontend',
          dataIndex: 'frontend',
          key: 'frontend',
          width: '13%',
          ...getColumnSearchProps('frontend'),
        },
        {
          title: 'Backend',
          dataIndex: 'backend',
          key: 'backend',
          width: '13%',
          ...getColumnSearchProps('backend'),
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            width: '13%',
            ...getColumnSearchProps('client'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '13%',
            ...getColumnSearchProps('description'),
        },
        {
        title: 'Manager',
        dataIndex: 'managerName',
        key: 'managerName',
        width: '16%',
        ...getColumnSearchProps('managerName'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <Button type="primary" 
                onClick={() => showModal(record.key)}
                >Edit
                </Button>
                <Divider type="vertical" />
                <Button type="danger">Delete</Button>
              </span>
            ),
          },
    ]

    return (
        <div>
            <Table columns={columns} dataSource={projects.projects} />
            <CreateProject
            ref={saveFormRef}
            visible={isVisible}
            onCancel={handleCancel}
            onCreate={handleCreate}
            />
        </div>
    )
}

export default ProjectList