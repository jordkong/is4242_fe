import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Layout, Row, Col, Form, Input, Button, message, Upload, Avatar, Card, Image } from 'antd';
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const uvicorn_url = 'http://127.0.0.1:8000'
const { Meta } = Card;

const App = (props) => {
  const [flower, setFlower] = useState();
  const [flowerIdentifiedSuccess, setFlowerIdentifiedSuccess] = useState(false);
  const [flowerIdentifiedFailed, setFlowerIdentifiedFailed] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Crude method to force rerender of page components on api response
  // useEffect(() => {}, [flowerIdentifiedSuccess, flowerIdentifiedFailed])

  // Reset state when user tries to upload a new picture
  const resetIdentifyFlower = () => {
    setFlower(null);
    setFlowerIdentifiedSuccess(false);
    setFlowerIdentifiedFailed(false);
  }

  const upload_props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: 'http://127.0.0.1:8000/get_label',
    onChange(info) {
      resetIdentifyFlower()
      handlePreview(info.file)
      console.log('info in Upload: ', info)
      const { status } = info.file;
      if (status !== 'uploading') {
        // May consider adding a spinner trigger
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        handleIdentifiedSuccess(info.file.response);
      } else if (status === 'error') {
        handleIdentifiedFailed();
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

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
          <Upload {...upload_props} className="upload-container">
            <Button icon={<UploadOutlined />} className="upload-button">Upload Image</Button>
          </Upload>
          {flowerIdentifiedSuccess &&
            <Card
              style={{
                width: 300,
              }}
              cover={
                <Image
                  src={previewImage}
                />
              }
              className="preview-card"
            >
              <Meta
                title={flower['class']}
              />
            </Card>
          }
        </div>
      </main>
    <footer className="app-footer">
      <p>IS4242 Group 2</p>
    </footer>
  </div>
  );
}

export default App;
