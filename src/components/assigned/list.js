import React, {useState, useCallback} from 'react'
import { Table, Input, Button, Icon, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

const AssignedBugsTable = (bugs) => {
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
          dataIndex: 'bug_title',
          key: 'bug_title',
          width: '13%',
          ...getColumnSearchProps('title'),
        },
        {
          title: 'Developer',
          dataIndex: 'developer_name',
          key: 'developer_name',
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
    ]

    return (
        <div>
            <Table columns={columns} dataSource={bugs.bugs} />
        </div>
    )
}

export default AssignedBugsTable