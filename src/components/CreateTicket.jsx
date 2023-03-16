import React from "react";
import { Button, Form, Input, Select, Space, Grid } from 'antd';
import { NavLink } from "react-router-dom";
//import fetch from 'node-fetch';

const {Row, Col, Card, Table } = Grid;



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
            <Row>
                <Col span={12}>
                    <Card title="TicketForm">
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
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="TicketData">
                        <Table>
                            <Table.Column title="Bug Name" dataIndex="bugName" key="bugName"/>
                            <Table.Column title="Bug Status" dataIndex="bugStatus" key="bugStatus"/>
                            <Table.Column title="Assigned Person" dataIndex="assignedPerson" key="assignedPerson"/>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CreateTicket;