import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Row, Col, Form, Input, Button, message, Upload } from 'antd';
import axios from 'axios'

const App = (props) => {
  const [flower, setFlower] = useState();
  const [flowerIdentifiedSuccess, setFlowerIdentifiedSuccess] = useState(false);
  const [flowerIdentifiedFailed, setFlowerIdentifiedFailed] = useState(false);

  // Handle state change on successful API call
  const handleIdentifiedSuccess = (flowerName) => {
    setFlower(flowerName);
    setFlowerIdentifiedSuccess(true);
  }

  // Handle state change on failed API call
  const handleIdentifiedFailed = () => {
    message.error("Something went wrong while trying to identify this flower")
    setFlowerIdentifiedFailed(true);
  }

  // Crude method to force rerender of page components on api response
  useEffect(() => {}, [flowerIdentifiedSuccess, flowerIdentifiedFailed])

  // Reset state when user tries to upload a new picture
  const resetIdentifyFlower = () => {
    setFlower(null);
    setFlowerIdentifiedSuccess(false);
    setFlowerIdentifiedFailed(false);
  }

  // Handle whatever file upload processing necessary here, and pass to uploadFile
  const handleSubmit = () => {

  }

  // Axios API call to flask
  const uploadFile = (data) => {
    const url = ``;
    const body = data;
    
    axios.post(url, body, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(response => {
        handleIdentifiedSuccess(response.data);
      })
      .catch(err => {
        handleIdentifiedFailed();
      })
  }

  // UI Components rendered in the page
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
