import React from 'react';
import './App.css';
import { Button, Checkbox, Form, Input, Table, Space, Tag } from 'antd';
import { NavLink } from "react-router-dom";
import {useState} from 'react'

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

  const addTicket=(ticket)=>{
    /*You can do your work here nate! */
    console.log(ticket)
    /*setDataSource(pre=>{
      return [...pre, ]
    })*/
  }

  window.onload = function getAllTickets(){
    alert("Running")
    fetch('/api/all_tickets').then((response) => response.json())
    .then((data)=> {
      /*I'll let you figure out how to handle this, but data here is a dictionairy with every id of the ticket
      as keys and the ticket object as values.Proccess and add to the table as you need!*/
      for (let ticket in data){

        addTicket(data[ticket])
      }
    })
    .catch((error) => {
    alert(error);
  });

   /* .then(function(response) {
      return response.blob();
  }).then(function(response) {
      alert(response.json())
  });*/
  }

  

  return(
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

export default Ticket_Table;