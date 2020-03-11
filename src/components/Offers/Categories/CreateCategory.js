import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Select, Card, Button } from "antd";
import axios from "axios";
const CreateCategory = () => {
  const { Option } = Select;
  let history = useHistory();
  const formdata = new FormData();

  const [category_title, setCategoryTitle] = useState();
  const [off_cat_status, setCategoryStatus] = useState();

  const category_name = value => {
    setCategoryTitle(value);
  };

  function CreateCategory() {
    // if (off_cat_status == "active") {
    //   setCategoryStatus(1);
    // }
    formdata.append("category_title", category_title);
    formdata.append("off_cat_status", off_cat_status);
    console.log("formData", formdata);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_category",
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
          console.log("Created Vertical Response", response);
          history.push("/offer_types");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers List", error);
      });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    if (value == "active") {
      setCategoryStatus(1);
    } else {
      setCategoryStatus(0);
    }
  }

  return (
    <div>
      <Helmet title=" Create: Offer Category" />
      <div className="air__utils__heading">
        <h2>Create: Offer Category</h2>
      </div>
      <Card>
        <Form className="login-form">
          <Form.Item label="Name">
            <Input
              onChange={event => category_name(event.target.value)}
              placeholder="Enter Category Name"
            />
          </Form.Item>
        </Form>
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

        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button
            type="primary"
            onClick={() => {
              CreateCategory();
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

export default CreateCategory;
