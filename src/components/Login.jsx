import React from 'react';
import { useState } from "react";
import './App.css';
import { Button, Checkbox, Form, Input } from 'antd';
function Login() {
  const handleSubmission = (values) => {
    //Nate you can add your validation and verification code here! values.username is the entered username, values.password is the password! F
    console.log('Success:', values);
    alert("Button hit!")
    alert(`The name you entered was: ${values.username}`);
    alert(`The password you entered was: ${values.password}`);
  }
  return(
    <div className="login">
      <div class="container"></div>
<Form name="basic" onFinish={handleSubmission}>
  <Form.Item label="Username" name="username">
    <Input/>
  </Form.Item>
  <Form.Item label="Password" name="password" >
    <Input.Password/>
  </Form.Item>
  <Form.Item>
  <Button type="primary" htmlType="submit">
Submit</Button>
  </Form.Item>
</Form>
  </div>
  )
}
export default Login;