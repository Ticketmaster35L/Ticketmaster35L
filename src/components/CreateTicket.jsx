import React from "react";
import { Button, Form, Input} from 'antd';
//import fetch from 'node-fetch';



//FIXME: Implement the processJSON function
function CreateTicket(){
    const processJSONString = (values) => {
        const ticket = {"name": values.bugname, status: values.bugstatus, creationDate: new Date(), assignedUser: "Test Admin"};
        let jsonString = JSON.stringify(ticket);
        fetch('/api/create_ticket', {
                                    method: 'POST',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                    },
                                    body: jsonString })
            .then((data) => alert(data.json()),
                  (err) => alert(err))
        alert(jsonString + "\nSent!")
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
                    Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateTicket;