import React from 'react';
import './App.css';
import { Button, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'

const Profile = (props) => {
  const [form] = Form.useForm();

  let found = false

  fetch('/api/user/' + props.id, { method: 'GET' })
    .then((data) => data.text().then((text) => {
      let json = {}
      try {
        json = JSON.parse(text)
      } catch { }
      if (json.id) {
        found = true
        form.setFieldsValue({ name: json.name, email: json.email })
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
    .finally(() => {
      if (!found) {
        alert("Invalid ID: " + props.id)
        localStorage.removeItem("userId")
        props.setId(null)
        return (<>Invalid ID</>)
      }
    })

  if (!props.id) {
    return (<>Not Logged In</>)
  }

  const handleSubmission = (values) => {
    document.getElementById('successmsg').innerText = ""

    if (values.password)
      values.password = values.password.split("").reverse().join("")

    fetch('/api/user/' + props.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((data) => data.text().then((text) => {
        let json = {}
        try {
          json = JSON.parse(text)
        } catch { }
        if (json.id) {
          //navigate('/')
          document.getElementById('errmsg').innerText = ""
          document.getElementById('successmsg').innerText = "Success!"
          props.updateState({})
          if (props.setId)
            console.log("success!: " + json.id)
        }
        else if (json.err) {
          document.getElementById('errmsg').innerText = json.err
          console.error('json.err: ' + json.err)
        }
        else {
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
    <div className="register">
      <div className="container"></div>
      <Form name="basic" onFinish={handleSubmission} form={form}>
        <Form.Item label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password"
          name="password">
          <Input.Password />
        </Form.Item>
        <div id='errmsg'></div>
        <div id='successmsg'></div>
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

/*
class Profile extends React.Component {
    componentDidMount() {
        let found = false

        fetch('/api/user/' + this.props.id, { method: 'GET' })
            .then((data) => data.text().then((text) => {
            let json = {}
            try {
                json = JSON.parse(text)
            } catch { }
            if (json.id) {
                found = true
                document.getElementById('name_input').value = json.name
                document.getElementById('email_input').value = json.email
                document.getElementById('name_input').defaultValue = json.name
                document.getElementById('email_input').defaultValue = json.email
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
            .finally(() => {
                    if (!found) {
                        alert("Invalid ID: " + this.props.id)
                        localStorage.removeItem("userId")
                        this.props.setId(null)
                        return (<>Invalid ID</>)
                    }
                })
    }

    render() {
        if (!this.props.id) {
            return (<>Not Logged In</>)
        }

        const handleSubmission = (values) => {
            document.getElementById('successmsg').innerText = ""

            if (values.password)
                values.password = values.password.split("").reverse().join("")

            fetch('/api/user/' + this.props.id, {
                      method: 'POST',
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(values)})
                      .then((data) => data.text().then((text) => {
                        let json = {}
                        try {
                          json = JSON.parse(text)
                        } catch { }
                        if (json.id) {
                          //navigate('/')
                          document.getElementById('errmsg').innerText = ""
                          document.getElementById('successmsg').innerText = "Success!"
                          this.props.setId(this.props.id)
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
                <Input id="name_input" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input id="email_input" />
              </Form.Item>
              <Form.Item label="Password" name="password" >
                <Input.Password/>
              </Form.Item>
              <div id='errmsg'></div>
              <div id='successmsg'></div>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
            
            <NavLink className="nav-link" to="/login" onClick={() => { localStorage.removeItem("userId"); this.props.setId(null) }}>
              Sign Out
            </NavLink>
      </div>
      )
    }
}

*/

export default Profile