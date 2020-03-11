import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Card, Select, Button } from "antd";
import axios from "axios";

const CreateCategory = () => {
  const { Option } = Select;
  let history = useHistory();
  const formdata = new FormData();
  const [group_name, setGroupTitle] = useState();
  const [group_status, setGroupStatus] = useState();

  const group_title = value => {
    setGroupTitle(value);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    if (value == "active") {
      setGroupStatus(1);
    } else {
      setGroupStatus(0);
    }
  }

  function CreateGroup() {
    formdata.append("group_name", group_name);
    formdata.append("group_status", group_status);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_group",
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
          console.log("Created Group Response", response);
          history.push("/offer_groups");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Creating Group", error);
      });
  }

  return (
    <div>
      <Helmet title=" Create: Offer Category" />
      <div className="air__utils__heading">
        <h2>Create: Offer Group</h2>
      </div>
      <Card>
        <Form className="login-form">
          <Form.Item label="Name">
            <Input
              onChange={event => group_title(event.target.value)}
              placeholder="Enter Group Name"
            />
          </Form.Item>
        </Form>
        {/* <Link to={`/offer_types`}> */}
        <Form.Item label="Status">
          <Select
            defaultValue="Select One.."
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">InActive</Option>
          </Select>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            CreateGroup();
          }}
        >
          Create
        </Button>
        {/* </Link> */}
      </Card>
    </div>
  );
};

export default CreateCategory;
