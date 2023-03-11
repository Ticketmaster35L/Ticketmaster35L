import React from "react";
import { Button, Form, Input} from 'antd';


//FIXME: Implement the processJSON function
function CreatePost(){
    const processJSONString = (values) => {

    }
    return (
        <div className="postCreator">
            <div class="container"></div>
            <Form name="PostFields" onFinish={processJSONString}>
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

export default CreatePost;