import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Input } from "antd";
import axios from "axios";

const CreatePublisher = () => {
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const formdata = new FormData();
  const handleSubmit = () => {
    // e.preventDefault()
    console.log("Name", fname, lname, email);
    const postdata = {
      title: "Testing",
      url: "www.offfers.com",
      country_code: "IN",
      group_id: "1",
      publisher_id: "1",
      payout: "IN",
      payout_currency: "IN",
      daily_cap: "20",
      time_zone: "IB",
      alternative_offer_id: "IN",
      priority_code: "YES"
    };
    Object.keys(postdata).forEach(key => {
      formdata.append(key, postdata[key]);
    });
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers",
      data: formdata,
      method: "post",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Response", response);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  };
  return (
    <div>
      <Helmet title="Create Publishers" />
      <Form {...formItemLayout} labelAlign="left">
        <Form.Item label="Firstname">
          <Input
            placeholder="Your FirstName..."
            onChange={e => {
              setFName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Lastname">
          <Input
            placeholder="Your Lastname..."
            onChange={e => {
              setLName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            placeholder="Your Email..."
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <button
          type="button"
          onClick={e => {
            handleSubmit(e);
          }}
          className="btn btn-success px-5"
        >
          Create Publisher
        </button>
      </Form>
    </div>
  );
};

export default CreatePublisher;
