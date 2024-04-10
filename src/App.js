import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Layout, Row, Col, Form, Input, Button, message, Upload } from 'antd';
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';


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
  const handleSubmit = (file) => {
    uploadFile(file);
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
    <div className="app-container">
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">
          <span>Flower Detector</span>
          <LocalFloristIcon fontSize="large" style={{ color: 'white', verticalAlign: 'middle' }}/>
        </h1>
      </div>
    </header>
    <main className="app-main">
        <div className="main-content">
          <p className="app-description">
            Upload a picture to identify the type of flower
          </p>
          <Upload onChange={(info) => handleSubmit(info.file)} className="upload-container">
            <Button icon={<UploadOutlined />} className="upload-button">Upload Image</Button>
          </Upload>
        </div>
      </main>
    <footer className="app-footer">
      <p>IS4242 Group 2</p>
    </footer>
  </div>
  );
}

export default App;
