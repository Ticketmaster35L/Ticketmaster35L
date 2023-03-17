import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";

const { TextArea } = Input;

//FIXME: Implement the processJSON function
function CreateTicket(props) {
    const [userList, setUserList] = useState([])
    const [fetched, setFetched] = useState(false)
    const navigate = useNavigate()

    if (!fetched) {
        fetch('/api/all_users').then((response) => response.text())
            .then((text) => {
                console.log(text)
                const obj = JSON.parse(text, function (k, v) {
                    if (k === "key") {
                        this.value = v;
                        return; // if return  undefined, orignal property will be removed
                    } else if (k === "name") {
                        this.label = v;
                        return;
                    }
                    return v;
                });
                console.log(obj)
                return obj
            })
            .then((data) => {
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
        const ticket = { name: values.bugname, status: values.bugstatus, creationDate: new Date(), assignedUser: values.assignedperson, dueDate: values.date, description: values.description, languages: values.language };
        fetch('/api/create_ticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        }).then((data) => data.text().then((text) => {
            let json = {}
            try {
                json = JSON.parse(text)
            } catch { }
            if (json.id) {
                navigate('/')
            } else if (json.err) {
                document.getElementById('errmsg').innerText = json.err
                console.error('json.err: ' + json.err)
            } else {
                document.getElementById('errmsg').innerText = text
                console.error('text: ' + text)
                console.error('json: ' + json)
            }
        }),
            (err) => alert(err))
            .catch((err) => {
                document.getElementById('errmsg').innerText = err
                console.error('catch: ' + err)
            })
    }
    return (
        <div className="ticketCreator">
            <div class="container"></div>
            <Form name="TicketFields" onFinish={processJSONString}>
                <Form.Item label="Ticket Name"
                    name="bugname"
                    rules={[{ required: true, message: 'Please enter a ticket name' }]}>
                    <Input placeholder="Ticket Name" />
                </Form.Item>
                <Form.Item label="Assigned Person"
                    name="assignedperson" >
                    <Select
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input?.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={userList}
                    />
                </Form.Item>
                <Form.Item label="Language"
                    name="language">
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
                <Form.Item label="Ticket Status"
                    name="bugstatus">
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
                <Form.Item label="Due Date"
                    name="date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Description"
                    name="description">
                    <TextArea rows={4} placeholder="Description" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <NavLink className="nav-link" to="/">
                Go Back
            </NavLink>
        </div>
    )
}

export default CreateTicket;