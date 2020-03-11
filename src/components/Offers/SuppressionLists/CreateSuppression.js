import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Card, Button } from "antd";
import axios from "axios";

const CreateSuppression = () => {
  //   const { Option } = Select;
  let history = useHistory();
  const formdata = new FormData();

  const [name, setSuppressionName] = useState();
  const [download_url, setDownloadUrl] = useState();
  const [unsubscribe_url, setUnsubscribeUrl] = useState();

  const suppressionName = value => {
    setSuppressionName(value);
  };

  const downloadUrl = value => {
    setDownloadUrl(value);
  };

  const unsubscribeUrl = value => {
    setUnsubscribeUrl(value);
  };

  function CreateSuppression() {
    formdata.append("name", name);
    formdata.append("download_url", download_url);
    formdata.append("unsubscribe_url", download_url);
    console.log("formData", formdata);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_suppression_list",
      data: formdata,
      method: "post",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
          console.log("Created Suppression Response", response);
          history.push("/dne_lists");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Creating Suppression", error);
      });
  }

  return (
    <div>
      <Helmet title=" Create: Suppression List" />
      <div className="air__utils__heading">
        <h2>Create: Suppression List</h2>
      </div>
      <Card>
        <Form className="login-form">
          <Form.Item label="Name">
            <Input
              onChange={event => suppressionName(event.target.value)}
              placeholder="Enter Suppression Name"
            />
          </Form.Item>

          <Form.Item label="Download Url">
            <Input
              onChange={event => downloadUrl(event.target.value)}
              placeholder="Enter Download Url"
            />
          </Form.Item>

          <Form.Item label="Unsubscribe Url">
            <Input
              onChange={event => unsubscribeUrl(event.target.value)}
              placeholder="Enter Unsubscribe Url"
            />
          </Form.Item>
        </Form>

        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button
            type="primary"
            onClick={() => {
              CreateSuppression();
            }}
          >
            Create
          </Button>
        </div>
        {/* </Link> */}
      </Card>
    </div>
  );
};

export default CreateSuppression;
