import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Button, Card, Input } from "antd";
import axios from "axios";

const ViewBanner = () => {
  var banner = JSON.parse(localStorage.getItem("record"));
  console.log("banner", banner);
  const downloadData = () => {
    fetch("https://api.linkswatch.io/uploads/" + banner.file).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = banner.file;
        a.click();
      });
    });
  };

  const editbanner = record => {
    localStorage.setItem("banner", JSON.stringify(record));
  };

  return (
    <div>
      <Helmet title=" Add: Creative Files" />
      <div className="air__utils__heading">
        <h2>{banner.name}- Creative File</h2>
      </div>

      <Card title="Details">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            onClick={() => {
              editbanner(banner);
            }}
            to={`/offer_files/edit/${banner.id}`}
          >
            <Button type="primary">Edit</Button>
          </Link>
        </div>

        <Form layout="horizontal">
          <Form.Item label="Name">
            <Input value={banner.name} />
          </Form.Item>
          <Form.Item label="Offer">
            <Input value={banner.title} />
          </Form.Item>
          <Form.Item label="Type">
            <Input value={banner.filetype} />
          </Form.Item>
          <Form.Item label="File">
            <Button type="link" onClick={() => downloadData()}>
              Download
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Form.Item></Form.Item>
      <Card title="Settings">
        <Form layout="horizontal">
          <Form.Item label="Status">
            <Input value={banner.active_status == 1 ? "Active" : "InActive"} />
          </Form.Item>
          <Form.Item label="Private">
            <Input value={banner.private == 1 ? "Yes" : "No"} />
          </Form.Item>
        </Form>
      </Card>
      <Form.Item></Form.Item>
      <Card title="Preview">
        <Form layout="horizontal">
          <div className="mb-4 airutilsscrollTable">
            <img src={"https://api.linkswatch.io/uploads/" + banner.file} />
          </div>
        </Form>
      </Card>
    </div>
  );
};
export default ViewBanner;
