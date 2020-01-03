import React, {useState, useCallback} from 'react'
import {useDispatch} from 'react-redux';
import { Table, Input, Button, Icon, message, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import AssignBug from '../../Modals/assignBug'
import AxiosAuth from '../../AxiosAuth/AxiosAuth'
import * as creators from '../../state/actionCreators'

const UnassignedBugs = (projects) => {
    const [searchText, setSeacrhText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [searchInput, setSearchInput] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [formRef, setFormRef] = useState(null)
    const [bugKey, setBugKey] = useState('')

    const dispatch = useDispatch()

    const showModal = (id) => {
        setBugKey(id)
        setIsVisible(true)
    }
  
    const handleCancel = () => {
        setIsVisible(false)
    }

    const saveFormRef = useCallback(node => {
        if (node !== null) {
            setFormRef(node)
        }
      }, [])

    const tref = useCallback(node => {
        setSearchInput(node)
    }, [])

    const handleCreate = () => {
        formRef.validateFields((err, values) => {
            if (err) {
              return;
            }
            const dev = parseInt(values.developer)

            const details = {
                user_id: dev,
                bug_id: bugKey
            }

            AxiosAuth()
            .post('http://localhost:8000/api/unassigned', details)
            .then(res => {
                formRef.resetFields()
                message.info('Project Assigned')
                dispatch(creators.getBugs())
                dispatch(creators.getAssignedBugs())
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
          title: 'Title',
          dataIndex: 'bug_title',
          key: 'bug_title',
          width: '13%',
          ...getColumnSearchProps('title'),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: '13%',
          ...getColumnSearchProps('description'),
        },
        {
          title: 'Severity',
          dataIndex: 'severity',
          key: 'severity',
          width: '13%',
          ...getColumnSearchProps('severity'),
          render: severity => (
            <span>
                  <Tag color="volcano" key={severity}>
                    {severity.toUpperCase()}
                  </Tag>
            </span>
          ),
        },
        {
            title: 'Date Reported',
            dataIndex: 'date_reported',
            key: 'date_reported',
            width: '13%',
            ...getColumnSearchProps('date_reported'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '13%',
            ...getColumnSearchProps('status'),
            render: status => (
              <span>
                    <Tag color="orange" key={status}>
                      {status.toUpperCase()}
                    </Tag>
              </span>
            ),
        },
        {
        title: 'Project',
        dataIndex: 'project_title',
        key: 'project_title',
        width: '16%',
        ...getColumnSearchProps('project'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              text.status === 'Assigned' ?
              <span>
              <Button type="link"
              >Assigned
              </Button>
              </span> :
              <span>
                <Button type="link" 
                onClick={() => showModal(record.key)}
                >Assign Bug
                </Button>
              </span>
            ),
          },
    ]

    return (
        <div>
            <Table columns={columns} dataSource={projects.projects} />
            <AssignBug
            ref={saveFormRef}
            visible={isVisible}
            onCancel={handleCancel}
            onCreate={handleCreate}/>
        </div>
    )
}

export default UnassignedBugs