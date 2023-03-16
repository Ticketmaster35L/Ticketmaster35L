import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { NavLink } from "react-router-dom";

const { TextArea } = Input;

//FIXME: Implement the processJSON function
function CreateTicket(props) {
    const [userList, setUserList] = useState([])
    const [fetched, setFetched] = useState(false)
  
    if (!fetched) {
      fetch('/api/all_users').then((response) => response.json())
        .then((data)=> {
          /*I'll let you figure out how to handle this, but data here is a dictionairy with every id of the ticket
          as keys and the ticket object as values.Proccess and add to the table as you need!*/
          setUserList(data.users)
          setFetched(true)
        })
        .catch((error) => {
          alert(error);
        })
    }

    const processJSONString = (values) => {
        if (values.assignedperson == null || values.bugname == null || values.bugstatus == null || values.date == null || values.description == null || values.language == null) {
            alert("Please complete all fields before submission")
            return
        }
        const ticket = { "name": values.bugname, status: values.bugstatus, creationDate: new Date(), assignedUser: values.assignedperson, dueDate: values.date, description: values.description, languages: values.language };
        fetch('/api/create_ticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        })
            .then((data) => alert(data.json()),
                (err) => alert(err))
        alert(JSON.stringify(ticket) + "\nSent!")
    }
    return (
        <div className="ticketCreator">
            <div class="container"></div>
            <Form name="TicketFields" onFinish={processJSONString}>
                <Form.Item label="Ticket Name" name="bugname">
                    <Input placeholder="Ticket Name" />
                </Form.Item>
                <Form.Item label="Assigned Person" name="assignedperson" >
                    <Input placeholder="Assigned Person" />
                </Form.Item>
                <Form.Item label="Language" name="language">
                    <Select
                        defaultValue="Pick Language"
                        style={{
                            width: 120,
                        }}
                        options={[
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
                    />
                </Form.Item>
                <Form.Item label="Ticket Status" name="bugstatus" >
                    <Select
                        defaultValue="Choose Status"
                        style={{
                            width: 120,
                        }}
                        options={[
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
                    />
                </Form.Item>
                <Form.Item label="Due Date" name="date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={4} placeholder="Description" />
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
    )
}

export default CreateTicket;