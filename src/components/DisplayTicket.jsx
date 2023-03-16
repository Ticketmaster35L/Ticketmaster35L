import React from "react";
import { Row, Col, Card, Table } from 'antd';

const DisplayTicket = () => {
    return (
        <>
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
        </>
    )
}

export default DisplayTicket;