import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Card, Button, Select } from "antd";
import axios from "axios";
// import { compose } from "redux";

const EditGroup = () => {
  const { Option } = Select;

  let history = useHistory();
  //   const formdata = new FormData();

  var editgroup = JSON.parse(localStorage.getItem("record"));

  const [edit_group_name, setEditGroupTitle] = useState(editgroup.group_name);
  const [edit_off_grp_status, setEditGroupStatus] = useState(
    editgroup.group_status
  );

  console.log("editcategory", editgroup);

  const group_name = value => {
    setEditGroupTitle(value);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    if (value == "active") {
      setEditGroupStatus(1);
    } else {
      setEditGroupStatus(0);
    }
  }
  function SaveGroup() {
    // formdata.append("category_title", category_title);
    const data = {
      group_name: edit_group_name,
      group_status: edit_off_grp_status
    };
    const config = {
      url: `https://api.linkswatch.io/Offersapi/offers_group/${editgroup.grp_id}`,
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
          console.log("Edited Group Response", response);
          history.push("/offer_groups");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Editing Offer Group", error);
      });
  }

  return (
    <div>
      <Helmet title=" Create: Offer Category" />
      <div className="air__utils__heading">
        <h2>Edit: Offer Group</h2>
      </div>
      <Card>
        <Form className="login-form">
          <Form.Item label="Name">
            <Input
              value={edit_group_name}
              onChange={event => group_name(event.target.value)}
            />
          </Form.Item>
        </Form>
        <Form.Item label="Status">
          <Select
            //   defaultValue="Select One.."
            style={{ width: 120 }}
            onChange={handleChange}
            value={edit_off_grp_status == 1 ? "active" : "inactive"}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">InActive</Option>
          </Select>
        </Form.Item>

        {/* <Link to={`/offer_types`}> */}
        <Button
          type="primary"
          onClick={() => {
            SaveGroup();
          }}
        >
          Save
        </Button>
        {/* </Link> */}
      </Card>
    </div>
  );
};

export default EditGroup;
