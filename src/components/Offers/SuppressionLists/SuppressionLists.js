import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Tooltip, Icon, Button, Table } from "antd";
import axios from "axios";
import { replace } from "connected-react-router";

const SuppressionLists = () => {
  const [suppression_list, setSuppressionList] = useState();

  const download = url => {
    window.open(url, "__blank");
  };
  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_suppression_list",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Suppression List", response);
        setSuppressionList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Suppression List", error);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Source",
      dataIndex: "download_url"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          <a>{record.status == 1 ? "Enabled" : "Disabled"}</a>
        </span>
      )
    },
    {
      title: "Download",
      key: "download_url",
      width: 100,
      render: (text, record) => (
        // <Link to={{ pathname: `${record.download_url}` }}>
        <Button type="link" onClick={() => download(record.download_url)}>
          Download
        </Button>
        // </Link>
      )
    }
  ];

  return (
    <div>
      <Helmet title="Suppression Lists" />
      <div
        className="air__utils__heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* <div> */}
        <h2>Suppression Lists</h2>
        {/* </div> */}

        {/* <div style={{ display: "flex", justifyContent: "right" }}> */}
        <Link to={`/dne_lists/create_list`}>
          <Button type="primary">Create Suppression List</Button>
        </Link>
        {/* </div> */}
      </div>
      <Table columns={columns} dataSource={suppression_list} bordered />
    </div>
  );
};

export default SuppressionLists;
