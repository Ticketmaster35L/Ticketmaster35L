import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api/express_backend');
    for(const pair of response.headers){
        console.log(`${pair[0]}: ${pair[1]}`); 
      }
      console.log(response.url)
    const body = await response.json();
    console.log("test")
    console.log(body)

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;


    //Ant Design test components
    
  };

  render() {
    return (
      <div className="App">        
        
        {/* Ant design form for Nate's Javascript*/}.
      </div>
      
    );
  }
}

export default App;