import React, { useEffect } from "react";
import { useParams } from "react-router";
import {useState} from 'react'
import { Form, Input, Row, Col, Card, Table, Button,Select,DatePicker } from 'antd';
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

  useEffect(() => {
    // Fetch post using the postSlug
    console.log("refreshing")
    fetch('/api/ticket/'+postSlug).then((response) => response.json())
    .then((ticket)=> {
      setTicket_name(ticket.name)
      setTicket_status(ticket.status)
      setTicket_dueDate(dayjs(ticket.dueDate))
      setTicket_assignedUser(ticket.assignedUser)
      setTicket_assignedDate(dayjs(ticket.assignedDate))
    })

  }, [postSlug]);
  const handleTicketChange = (index,event) => {
    console.log(index)
    if(index=="dueDate"){      
      if(event.$d == "Invalid Date"|| event.$d==null){
        console.log("INvalid Date")
        return}}
    console.log(event)
    let data = {
      //EVERY FIELD MUST BE IN HERE
      name:ticket_name,
      status:ticket_status,
      assignedUser:ticket_assignedUser,
      duedate:ticket_dueDate,
      assignedDate:"",
      description:"",
      language:""
    };
    if(index=="status"){
      data[index] = event;
    }
    else if(index="duedate"){
      data[index]= event.$d
      console.log(dayjs(data[index]))
    }
    else{
      data[index] = event.target.value;

    }
    //SET EVERY TICKET FIELD'S STATE HERE
    setTicket_name(data.name)
    setTicket_status(data.status)
    setTicket_dueDate(dayjs(data["duedate"]))
    //console.log(ticket_status)
    fetch('/api/ticket/'+postSlug,{
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    ).then((response) => JSON.stringify(response))

    //alert(event.target.value)
  }
  
  const { TextArea } = Input;
  return (
    
    <div className="home">
      <div class="container">
        <div className="ticketDescriptor">
            <div class="container"></div>
            <Descriptions title="Ticket Info" bordered>
            <Descriptions.Item label="Ticket Name"><Input name="ticket_name" type="text" value={ticket_name} onChange={event => handleTicketChange("name",event)} bordered={false} /></Descriptions.Item>
            <Descriptions.Item label="Assigned User" span={2}><Input name="Assigned User" type="text" value={ticket_assignedUser} onChange={event => handleTicketChange("assignedUser",event)} bordered={false}/></Descriptions.Item>
            <Descriptions.Item  label="Ticket Status"span={3} >
              
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
      style={{width: '100%'}} name="ticket_status" onChange={event => handleTicketChange("status",event)} bordered={false} showArrow={false} />
              
              </Descriptions.Item>
              
               <Descriptions.Item label="Due Date"span={2}><DatePicker value={ticket_dueDate} onChange={event => handleTicketChange("dueDate",event)} bordered={false}/></Descriptions.Item> 
              <Descriptions.Item label="Assigned Date"span={1}><DatePicker value={ticket_assignedDate} disabled/></Descriptions.Item>

            </Descriptions>
            <Form name="Comments">
                    <Form.Item label="Insert a comment here" name="commentForm">
                        <TextArea name="Comment Field" rows={6} cols={100}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <NavLink className="nav-link" to={-1}>
                Go Back
            </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Post;
