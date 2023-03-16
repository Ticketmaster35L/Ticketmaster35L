import React, { useEffect } from "react";
import { useParams } from "react-router";
import {useState} from 'react'
import { Form, Input, Row, Col, Card, Table, Button } from 'antd';
import { Descriptions, Radio } from 'antd';

function Post() {
  
  let { postSlug } = useParams();
  const [ticket_name, setTicket_name] = useState("")
  const [ticket_status, setTicket_status] = useState("")
  const [ticket_creationDate, setTicket_creationDate] = useState("")

  useEffect(() => {
    // Fetch post using the postSlug
    console.log("refreshing")
    fetch('/api/ticket/'+postSlug).then((response) => response.json())
    .then((ticket)=> {
      console.log(ticket)
      setTicket_name(ticket.name)
      setTicket_status(ticket.status)
      setTicket_creationDate(ticket.creationDate)
      console.log(ticket_name) 

    })

  }, [postSlug]);
  const handleTicketChange = (index,event) => {
    let data = {
      //EVERY FIELD MUST BE IN HERE
      name:ticket_name,
      status:ticket_status,
      assignedUser:"",
      creationDate:ticket_creationDate,
      dueDate:"",
      description:"",
      language:""
    };
    data[index] = event.target.value;
    //SET EVERY TICKET FIELD'S STATE HERE
    setTicket_name(data.name)
    setTicket_status(data.status)
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
            <Descriptions.Item label="Ticket Status"><Input name="ticket_status" type="text" value={ticket_status} onChange={event => handleTicketChange("status",event)} bordered={false}/></Descriptions.Item>
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
        </div>
      </div>
    </div>
  );
}

export default Post;
