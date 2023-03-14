import React from 'react';
import './App.css';
import { Button, Form, Input } from 'antd';

const userString = "NateCarman:P@ssword:Aryan03:AryanPass"

class Node{
  // Each node has three properties, its value, a pointer that indicates the node to its left and a pointer that indicates the node to its right
  constructor(user,pass){
      this.user = user
      this.pass = pass
      this.left = null
      this.right = null
  }
}

class BinarySearchTree {
  // The tree has only one property which is its root node
  constructor(){
      this.root = null
  }
  // The insert method takes a value as parameter and inserts the value in its corresponding place within the tree
  insert(user,pass){
      const newNode = new Node(user,pass)
      if(this.root === null){
          this.root = newNode
          return this
      }
      let current = this.root
      /* eslint-disable no-constant-condition */
      while(true){
          if(user === current.user) return undefined
          if(user < current.user){
              if(current.left === null){
                  current.left = newNode
                  return this
              }
              current = current.left
          } else {
              if(current.right === null){
                  current.right = newNode
                  return this
              } 
              current = current.right
          }
      }
  }
  // The find method takes a value as parameter and iterates through the tree looking for that value
  // If the value is found, it returns the corresponding node and if it's not, it returns undefined
  find(user){
      if(this.root === null) return false
      let current = this.root,
          found = false
      while(current && !found){
          if(user < current.user){
              current = current.left
          } else if(user > current.user){
              current = current.right
          } else {
              found = true
          }
      }
      if(!found) return undefined
      return current
  }
  // The contains method takes a value as parameter and returns true if the value is found within the tree
  contains(user){
      if(this.root === null) return false
      let current = this.root,
          found = false
      while(current && !found){
          if(user < current.user){
              current = current.left
          } else if(user > current.user){
              current = current.right
          } else {
              return true
          }
      }
      return false
  }
}

let userTree = new BinarySearchTree();

window.onload = function loadUserTree(){
  let usr = false
  let username = ""
  let password = ""
  for(let i of userString){
    if(i === ':'){
      if(usr === false){
        usr = true;
      }else{
        userTree.insert(username,password)
        username = ""
        password = ""
        usr=false
      }
    }else{
      if(usr === false){
        username+=i
      }
      else{
        password+=i
      }
    }
  }
  userTree.insert(username,password)
}

function Login() {
  const handleSubmission = (values) => {
    fetch('/api/' + (values.register ? "register" : "validate"), {
                  method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email: values.email, password: values.password.reverse()}) })
                  .then((data) => alert(data.body()),
                        (err) => alert(err))
    
    /*
    if(userTree.contains(values.username)){
      if(userTree.find(values.username).pass === values.password){
        alert('This Account Exists')
      }else{
        alert('Your password is incorrect')
      }
    }else{
      alert('This username does not exist')
    }
    //Nate you can add your validation and verification code here! values.username is the entered username, values.password is the password! F
    console.log('Success:', values);
    alert("Button hit!")
    
    alert(`The name you entered was: ${values.username}`);
    alert(`The password you entered was: ${values.password}`);
    */
  }

  return(
    <div className="login">
      <div class="container"></div>
        <Form name="basic" onFinish={handleSubmission}>
          <Form.Item label="Email" name="email">
            <Input/>
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input.Password/>
          </Form.Item>
          <Form.Item label="Register" name="register">
            <Checkbox/>
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
export default Login;
