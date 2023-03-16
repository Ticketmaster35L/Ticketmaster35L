import React from "react";
import { Row, Col } from 'antd';

const DisplayTicket = () => {
    return (
        <>
        <p>
            TestPrint
        </p>
        <Row gutter={[48,48]}>
            <Col span={12}>Col1</Col>
            <Col span={12}>Col2</Col>
            <Col span={12}>Col3</Col>
        </Row>
        </>
    )
}

export default DisplayTicket;