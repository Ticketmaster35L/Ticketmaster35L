import React from 'react';
import './App.css';
import { Button, Checkbox, Form, Input, Table, Space, Tag } from 'antd';
import createTicket from './CreateTicket';

function Ticket_Table(){
    const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ticket',
      dataIndex: 'ticket',
      key: 'ticket',
    },
    {
      title: 'Assigned to:',
      dataIndex: 'assigned',
      key: 'assigned',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
      ),
    },
    {
      title: 'Due Date (MM/DD)',
      dataIndex: 'dueDate',
      sorter: (a, b) => a.dueDate - b.dueDate,
    },
  ];


  class ticketSubmission{
    constructor(title,ticket,tags,dueDate,description){
      this.title = title
      this.ticket = ticket
      this.tags = tags
      this.dueDate = dueDate
      this.description = description
      this.subDate = new Date()
    }
  }

  //testTicket = new ticketSubmission


  const dataSource = [
    {
      key: '1',
      title: 'test',
      ticket: '(this is where the tickets would go)',
      tags: ['Blah Blah Blah'],
      dueDate: '00/00'
      
    },
    {
      key: '2',
      title: 'test',
      ticket: '(this is where the tickets would go',
      tags: ['Blah Blah Blah'],
      dueDate: '00/00'
      
    },
  ]
  return(
    <div className='postTable'>
        <Form name="basic">
            <Table dataSource={dataSource} columns={columns}/>
        </Form>
    </div>
  )

}

export default Ticket_Table;