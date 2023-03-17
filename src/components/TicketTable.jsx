import React, { useState } from 'react';
import './App.css';
import { Form, Table, Tag, Select, Input} from 'antd';
import { NavLink, useNavigate } from "react-router-dom";

function TicketTable() {
  const {Option} = Select
  const [dataSource, setDataSource] = useState([])
  const [fetched, setFetched] = useState(false)
  const navigate = useNavigate()


  if (!fetched) {
    fetch('/api/all_tickets').then((response) => response.json())
      .then((data) => {
        /*I'll let you figure out how to handle this, but data here is a dictionairy with every id of the ticket
        as keys and the ticket object as values.Proccess and add to the table as you need!*/
        setDataSource(data.tickets)
        console.log(dataSource)
        setFetched(true)
      })
      .catch((error) => {
        alert(error);
      })
  }

  const [searchedTicket, setSearchedTicket] = useState("")
  const [searchCondition, setSearchCondition] = useState("name")


  const selectSearch = (
    <Select defaultValue="All Columns" onChange={(e) => {
      setSearchCondition(e)
      //alert(searchCondition)
    }}>
      <Option value="all">All</Option>
      <Option value="ticket">Ticket Name</Option>
      <Option value="status">Status</Option>
      <Option value="assignedUser">Assigned To</Option>
      <Option value="languages">Language</Option>
      <Option value="dueDate">Due Date</Option>
    </Select>
  );

  const columns = [
    {
      title: 'TicketName',
      dataIndex: 'name',
      key: 'ticketName',
      filteredValue: [searchedTicket],
      onFilter: (value, record) => {
        let date = new Date(record.dueDate).toDateString()
        switch(searchCondition){
          case "status":
            return String(record.status).toLowerCase().includes(value.toLowerCase())
            break
          case "ticket":
            return String(record.name).toLowerCase().includes(value.toLowerCase())
            break
          case "assignedUser":
            return String(record.assignedUser).toLowerCase().includes(value.toLowerCase())
            break
          case "languages":
            return String(record.languages).toLowerCase().includes(value.toLowerCase())
            break
          case "dueDate":
            return String(date).toLowerCase().includes(value.toLowerCase())
            break
          default:
            return String(record.name).toLowerCase().includes(value.toLowerCase()) || 
            String(record.status).toLowerCase().includes(value.toLowerCase()) ||
            String(record.assignedUser).toLowerCase().includes(value.toLowerCase()) ||
            String(record.languages).toLowerCase().includes(value.toLowerCase()) ||
            String(date).toLowerCase().includes(value.toLowerCase())
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Assigned to:',
      dataIndex: 'assignedUser',
      key: 'assigned',
    },
    {
      title: 'Language',
      dataIndex: 'languages',
      key: 'language',
      render: (_, { languages }) => (
        <>
          <Tag color={languages && languages.length > 5 ? 'geekblue' : 'green'} key={languages}>
            {languages && languages}
          </Tag>
        </>
      ),
    },
    {
      title: 'Due Date (MM/DD)',
      dataIndex: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      render: (_, { dueDate }) => (
        <>
          {new Date(dueDate).toDateString()}
        </>
      ),
    },
  ];


  return (
    <div>
      <div>
        <NavLink className="nav-link" to="/createticket">
          Create a Ticket
        </NavLink>
      </div>
      <br />
      <div className='postTable'>
        <Form name="basic">
          <Input
            placeholder='Search'
            addonAfter={selectSearch}
            onChange={(e) => {
              setSearchedTicket(e.target.value)
            }}
          />
          <Table
            dataSource={dataSource}
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => { navigate("/ticket/" + record.key) }, // click row
                onDoubleClick: (event) => { }, // double click row
                onContextMenu: (event) => { }, // right button click row
                onMouseEnter: (event) => { }, // mouse enter row
                onMouseLeave: (event) => { }, // mouse leave row
              };
            }} />
        </Form>
      </div>
    </div>
  )

}

export default TicketTable;