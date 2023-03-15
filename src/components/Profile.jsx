import React from 'react';
import './App.css';
import { Button, Form, Input } from 'antd'
import { useNavigate, NavLink } from 'react-router-dom'

function Profile(props) {
    const navigate = useNavigate()

    if (!props.id) {
        return (<>Not Logged In</>)
    }

    let found = false

    const user = fetch('/api/users/' + props.id, { method: 'GET' })
        .then((data) => data.text().then((text) => {
          let json = {}
          try {
            json = JSON.parse(text)
          } catch { }
          if (json.id) {
            found = true
            return json
          } else if (json.err) {
            // Not found
          } else {
            // Not found
          }
        }),
              (err) => { // Not found
            })
        .catch((err) => { // Not found 
            })

    if (!found) {
        alert("Invalid ID: " + props.id)
        localStorage.removeItem("userId")
        props.setId(null)
        navigate('/login')
        return (<>Invalid ID</>)
    }

    const handleSubmission = (values) => {
        fetch('/api/users/' + props.id, {
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
      <div class="container"></div>
        <Form name="basic" onFinish={handleSubmission}>
          <Form.Item label="Name" name="name">
            <Input value={user.name}/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input value={user.email}/>
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input.Password/>
          </Form.Item>
          <div id='errmsg'></div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
        
        <NavLink className="nav-link" to="/login" onClick={() => { localStorage.removeItem("userId"); props.setId(null) }}>
          Sign Out
        </NavLink>
  </div>
  )
}
export default Profile;
