import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Table } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import axios from "axios";

const CreativeFiles = () => {
  const [banners_list, setBannersList] = useState([]);

  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Admin_Banners/getall_banners",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Banners List", response);
        setBannersList(response.data.Banners);
        // setImage(response.data.Banners[0].file);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Banners List", error);
      });
  }, []);

  function rerender() {
    const config = {
      url: "https://api.linkswatch.io/Admin_Banners/getall_banners",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Banners List", response);
        setBannersList(response.data.Banners);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Banners List", error);
      });
  }

  const DeleteRecord = record => {
    console.log("jhcdc", record);
    const config = {
      url: `https://api.linkswatch.io/Admin_Banners/delete_banners/${record.id}`,
      method: "delete",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Deleted Succesfully", response);
        // setOffersList(response.data.data);
        rerender();
      })
      // Error handling
      .catch(error => {
        console.log("Error While Deleting Record", error);
      });
  };

  const bannerRecord = record => {
    localStorage.setItem("record", JSON.stringify(record));
  };

  const columns = [
    {
      title: "Preview",
      // dataIndex: "file",
      // key: "file",
      render: (text, record) => (
        <span>
          <img
            src={"https://api.linkswatch.io/uploads/" + record.file}
            width="60"
            height="60"
          />
        </span>
      )
      // width: 50
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 50
    },
    {
      title: "Name",
      // dataIndex: "file",
      // key="file",
      width: 200,
      render: (text, record) => (
        <Link
          onClick={() => {
            bannerRecord(record);
          }}
          to={`/offer_files/view/${record.id}`}
        >
          {record.name}
        </Link>
      )
    },
    {
      title: "File",
      dataIndex: "file"
      // width: 220
    },
    {
      title: "Type",
      dataIndex: "filetype"
      // width: 220
    },
    {
      title: "Status",
      dataIndex: "active_status",
      key: "active_status",
      width: 100,
      render: (text, record) => (
        <span>
          <a>{record.active_status == 1 ? "Active" : "InActive"}</a>
        </span>
      )
    },
    {
      title: "Private",
      dataIndex: "private",
      render: (text, record) => (
        <span>
          <a>{record.private == 1 ? "Yes" : "No"}</a>
        </span>
      )
    },
    {
      title: "Offer",
      dataIndex: "title"
      // width: 220
    },
    {
      title: "Created",
      dataIndex: "created_at",
      width: 220
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Button type="link" onClick={() => DeleteRecord(record)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <Helmet title="Creative Files" />

      <div
        className="air__utils__heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h2>Creative Files</h2>
        <Link to={`/offer_files/upload_multiple`}>
          <Button type="primary">Add Creatives</Button>
        </Link>
      </div>

      <div>
        <Table
          scroll={{ x: 1500, y: 500 }}
          columns={columns}
          dataSource={banners_list}
          bordered
        />
      </div>
    </div>
  );
};

export default CreativeFiles;
