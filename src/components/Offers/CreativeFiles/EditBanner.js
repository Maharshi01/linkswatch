import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Icon, Button, Card, Select, Upload, message, Input } from "antd";
import axios from "axios";

const EditBanner = () => {
  var banner = JSON.parse(localStorage.getItem("banner"));
  console.log("banenr", banner);

  const { Option } = Select;

  let history = useHistory();

  const [edited_name, setEditedName] = useState();
  const [name, setName] = useState(banner.name);
  // const [offer, setOffersName] = useState();
  // const [filetype, setFileType] = useState("file");
  const [private_id, setPrivate] = useState(banner.private);
  const [active_status, setStatus] = useState(banner.active_status);

  const EditBanner = () => {
    const data = {
      name: name,
      active_status: active_status,
      private: private_id
    };
    const config = {
      url: `https://api.linkswatch.io/Admin_Banners/update_banners/${banner.id}`,
      data: data,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
          console.log("Edited Banner Response", response);
          history.push("/offer_files");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Editing Banner", error);
      });
  };

  useEffect(() => {
    // const config = {
    //   url: "https://api.linkswatch.io/Offersapi/offers",
    //   method: "get",
    //   headers: {
    //     Authorization:
    //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
    //   }
    // };
    // axios(config)
    //   .then(response => {
    //     console.log("Got Offers List", response.data.data);
    //     setOffersList(response.data.data);
    //   })
    //   // Error handling
    //   .catch(error => {
    //     console.log("Error While Getting Offers List", error);
    //   });
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
  // const props = {
  //   multiple: false,
  //   customRequest: options => {
  //     // console.log("in Custom Request");
  //     const { onSuccess, onError, file, action, onProgress } = options;
  //     const formData = new FormData();
  //     formData.append("offer", offer);
  //     formData.append("filetype", filetype);
  //     formData.append("file", options.file);
  //     formData.append("private", private_id);
  //     formData.append("overwrite_status", overwrite_status);
  //     const config = {
  //       url: "https://api.linkswatch.io/Admin_Banners/create_banners",
  //       data: formData,
  //       method: "post",
  //       headers: {
  //         Authorization:
  //           "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
  //       }
  //     };
  //     axios(config)
  //       .then(response => {
  //         if (response.status == 200) {
  //           onSuccess("Ok");
  //           console.log("Creative File Response", response);
  //           history.push("/offer_files");
  //         }
  //       })
  //       .catch(error => {
  //         onError("error");
  //         alert(error);
  //         console.log("Error While creating file", error);
  //       });

  //     // console.log("imageUrl", options.file);
  //   },
  //   onChange(info) {
  //     // console.log("info.file.status", info.file.status);
  //     const status = info.file.status;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   }
  // };
  function handlename(value) {
    console.log(`selected ${value}`);
    setName(value);
  }
  // function handleFileType(value) {
  //   console.log(`selected ${value}`);
  //   setFileType(value);
  // }
  const handlePrivate = value => {
    console.log(`selected ${value}`);
    setPrivate(value);
  };
  const handleStatus = value => {
    console.log(`selected ${value}`);
    setStatus(value);
  };
  return (
    <div>
      <Helmet title=" Add: Creative Files" />
      <div className="air__utils__heading">
        <h2>Edit: {banner.name}- Creative Files</h2>
      </div>

      <Card title="Details" bordered={true} style={{ width: "100%" }}>
        <Form.Item label="Name" style={{ width: 360 }}>
          <Input
            value={name}
            onChange={e => {
              handlename(e.target.value);
            }}
            // placeholder="Enter Title"
          />
        </Form.Item>
        <Form.Item label="Offer">
          <Input
            value={banner.title}
            // onChange={e => {
            //   handlename(e.target.value);
            // }}
            // placeholder="Enter Title"
          />
        </Form.Item>
        <Form.Item label="Type">
          <Input
            value={banner.filetype}
            // onChange={e => {
            //   handlename(e.target.value);
            // }}
            // placeholder="Enter Title"
          />
        </Form.Item>
      </Card>
      <Form.Item></Form.Item>

      <Card title="Settings" bordered={true} style={{ width: "100%" }}>
        <Form.Item label="Status">
          <Select
            // defaultValue="0"
            value={active_status == 0 ? "Deleted" : "Active"}
            style={{ width: 360 }}
            onChange={handleStatus}
          >
            <Option value="1">Active</Option>
            <Option value="0">Deleted</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Private">
          <Select
            // defaultValue="0"
            value={private_id == 0 ? "Disabled" : "Enabled"}
            style={{ width: 360 }}
            onChange={handlePrivate}
          >
            <Option value="1">Enabled</Option>
            <Option value="0">Disabled</Option>
          </Select>
        </Form.Item>
      </Card>
      <Form.Item></Form.Item>
      <Button type="primary" onClick={() => EditBanner()}>
        Save
      </Button>
    </div>
  );
};
export default EditBanner;
