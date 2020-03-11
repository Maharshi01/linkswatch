import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Card,
  Select,
  Upload,
  message
} from "antd";
import axios from "axios";

const CreateBanner = () => {
  const { Option } = Select;
  let history = useHistory();
  const formdata = new FormData();

  const [offers_list, setOffersList] = useState([]);

  const [offer, setOffersName] = useState();
  const [filetype, setFileType] = useState("file");
  // const [file, setFile] = useState();
  const [private_id, setPrivate] = useState("0");
  const [overwrite_status, setOverwriteStatus] = useState("0");

  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offers List", response.data.data);
        setOffersList(response.data.data);
      })
      // Error handling
      .catch(error => {
        console.log("Error While Getting Offers List", error);
      });
  }, []);

  function beforeUpload(file) {
    console.log("file", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const props = {
    multiple: false,
    customRequest: options => {
      // console.log("in Custom Request");
      const { onSuccess, onError, file, action, onProgress } = options;
      const formData = new FormData();
      formData.append("offer", offer);
      formData.append("filetype", filetype);
      formData.append("file", options.file);
      formData.append("private", private_id);
      formData.append("overwrite_status", overwrite_status);
      const config = {
        url: "https://api.linkswatch.io/Admin_Banners/create_banners",
        data: formData,
        method: "post",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
        }
      };
      axios(config)
        .then(response => {
          if (response.status == 200) {
            onSuccess("Ok");
            console.log("Creative File Response", response);
            history.push("/offer_files");
          }
        })
        .catch(error => {
          onError("error");
          alert(error);
          console.log("Error While creating file", error);
        });

      // console.log("imageUrl", options.file);
    },
    onChange(info) {
      // console.log("info.file.status", info.file.status);
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  function handleOffername(value) {
    console.log(`selected ${value}`);
    setOffersName(value);
  }
  function handleFileType(value) {
    console.log(`selected ${value}`);
    setFileType(value);
  }
  const handlePrivate = value => {
    console.log(`selected ${value}`);
    setPrivate(value);
  };
  const handleOverwrite = value => {
    console.log(`selected ${value}`);
    setOverwriteStatus(value);
  };
  return (
    <div>
      <Helmet title=" Add: Creative Files" />
      <div className="air__utils__heading">
        <h2>Add: Creative Files</h2>
      </div>

      <Card title="Details" bordered={true} style={{ width: "100%" }}>
        <Form.Item label="Offers" style={{ width: 360 }}>
          <Select
            defaultValue=""
            style={{ width: 360 }}
            onChange={handleOffername}
          >
            {offers_list.map(item => (
              <Option value={item.off_id}>{item.title}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="FileType:">
          <Select
            defaultValue="file"
            style={{ width: 360 }}
            onChange={handleFileType}
          >
            <Option value="file">File</Option>
            <Option value="image-banner">Image Banner</Option>
            <Option value="flash-banner">Flash Banner</Option>
            <Option value="html-ad">HTML Ad</Option>
            <Option value="text-link">Text Link</Option>
            <Option value="email-creative">Email Creative</Option>
            <Option value="offer-thumbnail">Offer Thumbnail</Option>
            <Option value="xml-feed">XML Feed</Option>
            <Option value="hidden-asset">Hidden Asset</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Private">
          <Select
            defaultValue="0"
            style={{ width: 360 }}
            onChange={handlePrivate}
          >
            <Option value="0">Disabled</Option>
            <Option value="1">Enabled</Option>
          </Select>
        </Form.Item>
      </Card>

      <Card title="Upload" bordered={true} style={{ width: "100%" }}>
        <Form.Item label="Overwrite File">
          <Select
            defaultValue="0"
            style={{ width: 360 }}
            onChange={handleOverwrite}
          >
            <Option value="1">Yes</Option>
            <Option value="0">No</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Files">
          <Upload {...props} beforeUpload={beforeUpload}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </Card>
    </div>
  );
};
export default CreateBanner;
