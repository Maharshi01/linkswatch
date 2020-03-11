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

const EditCategory = () => {
  const { Option } = Select;

  let history = useHistory();
  //   const formdata = new FormData();

  var editcategory = JSON.parse(localStorage.getItem("record"));

  const [edit_category_title, setEditCategoryTitle] = useState(
    editcategory.category_title
  );
  const [edit_off_cat_status, setEditCategoryStatus] = useState(
    editcategory.off_cat_status
  );

  console.log("editcategory", editcategory);

  const category_name = value => {
    setEditCategoryTitle(value);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    if (value == "active") {
      setEditCategoryStatus(1);
    } else {
      setEditCategoryStatus(0);
    }
  }
  function SaveCategory() {
    // formdata.append("category_title", category_title);
    const data = {
      category_title: edit_category_title,
      off_cat_status: edit_off_cat_status
    };
    const config = {
      url: `https://api.linkswatch.io/Offersapi/offers_category/${editcategory.off_cat_id}`,
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
          console.log("Created Vertical Response", response);
          history.push("/offer_types");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Editing Offer Category", error);
      });
  }

  return (
    <div>
      <Helmet title=" Create: Offer Category" />
      <div className="air__utils__heading">
        <h2>Edit: Offer Category</h2>
      </div>
      <Card>
        <Form className="login-form">
          <Form.Item label="Name">
            <Input
              value={edit_category_title}
              onChange={event => category_name(event.target.value)}
            />
          </Form.Item>
        </Form>
        <Form.Item label="Status">
          <Select
            // defaultValue="Select One.."
            style={{ width: 120 }}
            onChange={handleChange}
            value={edit_off_cat_status == 1 ? "active" : "inactive"}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">InActive</Option>
          </Select>
        </Form.Item>

        {/* <Link to={`/offer_types`}> */}
        <Button
          type="primary"
          onClick={() => {
            SaveCategory();
          }}
        >
          Save
        </Button>
        {/* </Link> */}
      </Card>
    </div>
  );
};

export default EditCategory;
