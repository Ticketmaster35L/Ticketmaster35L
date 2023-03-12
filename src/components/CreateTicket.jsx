import React from "react";
import { Button, Form, Input} from 'antd';
//import fetch from 'node-fetch';



//FIXME: Implement the processJSON function
function CreateTicket(){
    const processJSONString = (values) => {
    let dateBase = new Date();
    let currentDay = dateBase.getDate();
    let currentMonth = dateBase.getMonth();
    let currentYear = dateBase.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    const ticket = {"name": values.bugname, status: values.bugstatus, creationDate: currentDate, assignedUser: "Test Admin"};
    let jsonString = JSON.stringify(ticket);
    const response = fetch('/api/create_ticket', jsonString)
    alert(jsonString+"\n Sent!")
    alert(response)
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