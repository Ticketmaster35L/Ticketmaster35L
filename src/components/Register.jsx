import React from 'react';
import './App.css';
import { Button, Form, Input } from 'antd'
import { useNavigate, NavLink } from 'react-router-dom'

function Register(props) {
  const navigate = useNavigate()

  const handleSubmission = (values) => {
    fetch('/api/register', {
                  method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({name: values.name, email: values.email, password: values.password.split("").reverse().join("")}) })
                  .then((data) => data.text().then((text) => {
                    let json = {}
                    try {
                      json = JSON.parse(text)
                    } catch { }
                    if (json.id)
                    {
                      localStorage.setItem("userId", JSON.stringify(json.id));
                      console.log(props)
                      props.setId(json.id)
                      navigate('/')
                    }
                    else if (json.err)
                    {
                      document.getElementById('errmsg').innerText = json.err
                      console.error('json.err: ' + json.err)
                    }
                    else
                    {
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

  return(
    <div className="register">
      <div className="container"></div>
        <Form name="basic" onFinish={handleSubmission}>
          <Form.Item label="Name" name="name">
            <Input/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input/>
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input.Password/>
          </Form.Item>
          <div id='errmsg'></div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        
        <NavLink className="nav-link" to="/login">
          Log In
        </NavLink>
  </div>
  )
}
export default Register;
