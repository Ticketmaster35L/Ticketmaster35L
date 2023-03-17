import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { useState } from 'react'
import { Form, Input, Row, Col, Card, Table, Button, Select, DatePicker } from 'antd';
import { Descriptions, Radio } from 'antd';
import { NavLink } from "react-router-dom";
import dayjs from 'dayjs';



function Post() {

  let { postSlug } = useParams();
  const [ticket_name, setTicket_name] = useState("")
  const [ticket_status, setTicket_status] = useState("")
  const [ticket_dueDate, setTicket_dueDate] = useState("")
  const [ticket_assignedUser, setTicket_assignedUser] = useState("")
  const [ticket_assignedDate, setTicket_assignedDate] = useState("")
  const [ticket_description, setTicket_Description] = useState("")
  const [ticket_language, setTicket_Language] = useState("")

  useEffect(() => {
    // Fetch post using the postSlug
    console.log("refreshing")
    fetch('/api/ticket/' + postSlug).then((response) => response.json())
      .then((ticket) => {
        setTicket_name(ticket.name)
        setTicket_status(ticket.status)
        setTicket_dueDate(dayjs(ticket.dueDate))
        setTicket_assignedUser(ticket.assignedUser)
        setTicket_assignedDate(dayjs(ticket.assignedDate))
        setTicket_Description(ticket.description)
        setTicket_Language(ticket.languages)
        console.log(ticket)
      })

  }, [postSlug]);


  function Submission() {

    alert("Submit hit")
    /* if ( ticket_name == null ||  ticket_status == null ||  ticket_dueDate == null ||  ticket_assignedUser == null){
      alert("Please complete all fields before submission")
      return 
    } */
    let data = {
      //EVERY FIELD MUST BE IN HERE
      "name": ticket_name,
      status: ticket_status,
      assignedUser: ticket_assignedUser,
      dueDate: new Date(ticket_dueDate).toISOString(),
      assignedDate: ticket_assignedDate,
      description: ticket_description,
      languages: ticket_language
    };
    //SET EVERY TICKET FIELD'S STATE HERE
    //console.log(ticket_status)
    fetch('/api/ticket/' + postSlug, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    )//.then((data) => alert(data.json()))

    //alert(event.target.value)
  }

  const { TextArea } = Input;
  return (

    <div className="home">
      <div class="container">
        <div className="ticketDescriptor">
          <div class="container"></div>
          <Descriptions title={postSlug} bordered>
            <Descriptions.Item label="Ticket Name" span={2}><Input name="ticket_name" type="text" value={ticket_name} onChange={e => {setTicket_name(e.target.value)}} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Assigned User" span={1}><Input name="Assigned User" type="text" value={ticket_assignedUser} onChange={e => {setTicket_assignedUser(e.target.value)}} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Ticket Status" span={2}>

              <Select value={ticket_status} options={[
                {
                  value: 'Unfinished',
                  label: 'Unfinished',
                },
                {
                  value: 'In Progress',
                  label: 'In Progress',
                },
                {
                  value: 'Finished',
                  label: 'Finished',
                },
              ]}
                style={{ width: '100%' }} name="ticket_status" onChange={e => {setTicket_status(e)}} bordered={false} showArrow={false} />

            </Descriptions.Item>
            <Descriptions.Item label="Language" span={1} >

              <Select value={ticket_language} options={[
                        {
                            value: 'JavaScript',
                            label: 'JavaScript',
                        },
                        {
                            value: 'Python',
                            label: 'Python',
                        },
                        {
                            value: 'C++',
                            label: 'C++',
                        },
                        {
                            value: 'C#',
                            label: 'C#',
                        },
                        {
                            value: 'Java',
                            label: 'Java',
                        },
                        {
                            value: 'Bash',
                            label: 'Bash',
                        },                    
                        ]}
                style={{ width: '100%' }} name="ticket_language" onChange={e => {setTicket_Language(e)}} bordered={false} showArrow={false} />

            </Descriptions.Item>
            <Descriptions.Item label="Due Date" span={2}><DatePicker value={ticket_dueDate} onChange={e => {setTicket_dueDate(e) 
            alert(new Date(e).toISOString())}} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Assigned Date" span={1}><DatePicker value={ticket_assignedDate} disabled /></Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
            <TextArea bordered={false} name="Comment Field" rows={6} cols={100} value={ticket_description} onChange={e => {setTicket_Description(e.target.value)}}/>
            </Descriptions.Item>
          </Descriptions>
          
              <Button type="primary" htmlType="submit" onClick={e=>{Submission()}}>
                Save Data
              </Button>
          <NavLink className="nav-link" to={-1}>
            Go Back
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Post;
