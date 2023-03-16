import React from "react";
import { Form, Input, Row, Col, Card, Table, Button } from 'antd';

const DisplayTicket = () => {
    const {TextArea } = Input;
    return (
        <div className="ticketDescriptor">
            <div class="container"></div>
            <Row gutter={[480,480]}>
                <Col span={600}>
                   <Card title="Ticket Data">
                        <Table>
                           <Table.Column title="Bug Name" dataIndex ="bugName" key="bugName" />
                           <Table.Column title="Bug Status" dataIndex ="bugStatus" key="bugStatus" />
                           <Table.Column title="Creation Date" dataIndex ="creationDate" key="creationDate" />
                           <Table.Column title="Assigned Person" dataIndex ="assignedPerson" key="assignedPerson" />
                        </Table>
                    </Card>    
                </Col>
            </Row>
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
    )
}

export default DisplayTicket;