import React, {useState, useCallback} from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

const ProjectList = (projects) => {
    const [searchText, setSeacrhText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [searchInput, setSearchInput] = useState(null)

    const tref = useCallback(node => {
        setSearchInput(node)
    }, [])

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
        width: '13%',
        ...getColumnSearchProps('managerName'),
        },
    ]

    return (
        <Table columns={columns} dataSource={projects.projects} />
    )
}

export default ProjectList