import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from 'react'
import { Input, Button, Select, DatePicker } from 'antd';
import { Descriptions } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

function Ticket() {
  const navigate = useNavigate()

  let { ticketSlug } = useParams();
  const [ticketName, setTicketName] = useState("")
  const [ticketStatus, setTicketStatus] = useState("")
  const [ticketDueDate, setTicketDueDate] = useState("")
  const [ticketAssignedUser, setTicketAssignedUser] = useState("")
  const [ticketAssignedDate, setTicketAssignedDate] = useState("")
  const [ticketDescription, setTicketDescription] = useState("")
  const [ticketLanguage, setTicketLanguage] = useState("")

  useEffect(() => {
    // Fetch post using the postSlug
    fetch('/api/ticket/' + ticketSlug).then((response) => response.json())
      .then((ticket) => {
        setTicketName(ticket.name)
        setTicketStatus(ticket.status)
        setTicketDueDate(dayjs(ticket.dueDate))
        setTicketAssignedUser(ticket.assignedUser)
        setTicketAssignedDate(dayjs(ticket.assignedDate))
        setTicketDescription(ticket.description)
        setTicketLanguage(ticket.languages)
      })

  }, [ticketSlug]);


  function Submission() {

    let data = {
      // EVERY FIELD is IN HERE
      name: ticketName,
      status: ticketStatus,
      assignedUser: ticketAssignedUser,
      dueDate: new Date(ticketDueDate).toISOString(),
      assignedDate: ticketAssignedDate,
      description: ticketDescription,
      languages: ticketLanguage
    };
    // we SET EVERY TICKET FIELD'S STATE HERE
    fetch('/api/ticket/' + ticketSlug, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((data) => data.text().then((text) => {
      let json = {}
      try {
        json = JSON.parse(text)
      } catch { }
      if (json.id) {
        navigate('/')
      } else if (json.err) {
        console.error('json.err: ' + json.err)
      } else {
        console.error('text: ' + text)
        console.error('json: ' + json)
      }
    }),
      (err) => alert(err))
      .catch((err) => {
        console.error('catch: ' + err)
      })
  }

  const { TextArea } = Input;
  return (
    <div className="home">
      <div className="container">
        <div className="ticketDescriptor">
          <div className="container"></div>
          <Descriptions title={ticketSlug} bordered>
            <Descriptions.Item label="Ticket Name" span={2}><Input name="ticket_name" type="text" value={ticketName} onChange={e => { setTicketName(e.target.value) }} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Assigned User" span={1}><Input name="Assigned User" type="text" value={ticketAssignedUser} onChange={e => { setTicketAssignedUser(e.target.value) }} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Ticket Status" span={2}>

              <Select value={ticketStatus} options={[
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
                style={{ width: '100%' }} name="ticket_status" onChange={e => { setTicketStatus(e) }} bordered={false} showArrow={false} />

            </Descriptions.Item>
            <Descriptions.Item label="Language" span={1} >

              <Select value={ticketLanguage} options={[
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
                style={{ width: '100%' }} name="ticket_language" onChange={e => { setTicketLanguage(e) }} bordered={false} showArrow={false} />

            </Descriptions.Item>
            <Descriptions.Item label="Due Date" span={2}><DatePicker value={ticketDueDate} onChange={e => {
              setTicketDueDate(e)
              alert(new Date(e).toISOString())
            }} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Assigned Date" span={1}><DatePicker value={ticketAssignedDate} disabled /></Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              <TextArea bordered={false} name="Comment Field" rows={6} cols={100} value={ticketDescription} onChange={e => { setTicketDescription(e.target.value) }} />
            </Descriptions.Item>
          </Descriptions>

          <Button type="primary" htmlType="submit" onClick={e => { Submission() }}>
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

export default Ticket;
