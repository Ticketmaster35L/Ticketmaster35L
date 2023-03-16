import React, { useEffect } from "react";
import { useParams } from "react-router";
import {useState} from 'react'
import { Form, Input, Row, Col, Card, Table, Button } from 'antd';
import { Descriptions, Radio } from 'antd';

function Post() {
  
  let { postSlug } = useParams();
  const [ticket, setTicket] = useState([{}])

  useEffect(() => {
    // Fetch post using the postSlug
    console.log("refreshing")
    fetch('/api/ticket/'+postSlug).then((response) => response.json())
    .then((ticket)=> {
      console.log(ticket)
      setTicket(ticket)
    })

  }, [postSlug]);
  const handleTicketChange = (index,event) => {
    let data = ticket;
    data[index] = event.target.value;
    setTicket(data);
    fetch('/api/ticket/'+postSlug,{
      method: "POST",
      body: JSON.stringify(ticket),
    }
    ).then((response) => response.json()).then((data) => console.log(data))
    console.log(ticket.name)
    //alert(event.target.value)
  }
  const { TextArea } = Input;

  const input_field = {
    border : 0,
    width: '100%',
    height:"100%"
  };
  return (
    
    <div className="home">
      <div class="container">
        <div className="ticketDescriptor">
            <div class="container"></div>
            <Descriptions title="Ticket Info" bordered>
            <Descriptions.Item label="Ticket Name"><input style={input_field} type="text" defaultValue={ticket.name} onChange={event => handleTicketChange("name",event)}/></Descriptions.Item>
            <Descriptions.Item label="Ticket Status"><Input value={ticket.status} bordered={false}/></Descriptions.Item>
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
