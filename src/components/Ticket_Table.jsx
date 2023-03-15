import React from 'react';
import './App.css';
import { Button, Checkbox, Form, Input, Table, Space, Tag } from 'antd';
import { NavLink } from "react-router-dom";
import {useState} from 'react'

function Ticket_Table(){
    const columns = [
    {
      title: 'TicketName',
      dataIndex: 'ticketName',
      key: 'ticketName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Assigned to:',
      dataIndex: 'assigned',
      key: 'assigned',
    },
    {
      title: 'Language',
      key: 'language',
      dataIndex: 'language',
      render: (_, { language }) => (
      <>
        {language.map((tag) => {
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

  //testTicket = new ticketSubmission

  const [dataSource, setDataSource] = useState([
    
  ])

  const addTicket=(ticket)=>{
    
    const JSONTicket = JSON.stringify(ticket)
    alert(JSONTicket)
    const jsonList = JSON.parse(JSONTicket)
    //alert(jsonList.status)
    const newTicket = {
      key: '3',
      status: "jsonList.name",
      ticketName: jsonList.name,
      language: ["JavaScript"],
      assigned: jsonList.assignedUser,
      dueDate: '3/15'
    }
    setDataSource(pre =>{
      return [...pre, newTicket]
    })
    /*You can do your work here nate! */
    //console.log(ticket)
    /*setDataSource(pre=>{
      return [...pre, ]
    })*/
  }

  window.onload = function getAllTickets(){
    //alert("Running")
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