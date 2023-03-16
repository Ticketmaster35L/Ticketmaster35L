import React, { useState } from 'react';
import './App.css';
import { Form, Table, Tag } from 'antd';
import { NavLink } from "react-router-dom";

function TicketTable() {
  const [dataSource, setDataSource] = useState([])
  const [fetched, setFetched] = useState(false)

  if (!fetched) {
    fetch('/api/all_tickets').then((response) => response.json())
      .then((data)=> {
        /*I'll let you figure out how to handle this, but data here is a dictionairy with every id of the ticket
        as keys and the ticket object as values.Proccess and add to the table as you need!*/
        setDataSource(data.tickets)
        setFetched(true)
      })
      .catch((error) => {
        alert(error);
      })
  }

  const columns = [
    {
      title: 'TicketName',
      dataIndex: 'name',
      key: 'ticketName',
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
      sorter: (a, b) => a.dueDate - b.dueDate,
    },
  ];

  return (
    <div>
      <div>
        <NavLink className="nav-link" to="/createticket">
          Create a Ticket
        </NavLink>
      </div>
      <div className='postTable'>
        <Form name="basic">
          <Table dataSource={dataSource} columns={columns}/>
        </Form>
      </div>
    </div>
  )

}

export default TicketTable;