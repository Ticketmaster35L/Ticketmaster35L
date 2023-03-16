import React from "react";
import { Button, Form, Input, Select, Space} from 'antd';
import { NavLink } from "react-router-dom";
//import fetch from 'node-fetch';



//FIXME: Implement the processJSON function
function CreateTicket(){
    const processJSONString = (values) => {
        const ticket = {"name": values.bugname, status: values.bugstatus, creationDate: new Date(), assignedUser: values.assignedperson};
        fetch('/api/create_ticket', {
                                    method: 'POST',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(ticket) })
            .then((data) => alert(data.json()),
                  (err) => alert(err))
        alert(JSON.stringify(ticket) + "\nSent!")
//console.log(ticket.name);

//console.log(ticket.status);

//console.log(ticket.creationDate);

//console.log(ticket.assignedUser);
    }
    return (
        <div className="ticketCreator">
            <div class="container"></div>
            <Form name="TicketFields" onFinish={processJSONString}>
                <Form.Item label="Bug Name" name="bugname">
                    <Input/>
                </Form.Item>
                <Form.Item label="Bug Status" name="bugstatus" >
                    <Input/>
                </Form.Item>
                <Form.Item label="Assigned Person" name="assignedperson" >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <NavLink className="nav-link" to="/tickets">
                  Go Back
                </NavLink>
        </div>
    )
}

export default CreateTicket;