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

const OfferGroups = () => {
  const [groups_list, setGroupsList] = useState();

  const edit_group = record => {
    localStorage.setItem("record", JSON.stringify(record));
  };

  const offer_group_list = record => {
    localStorage.setItem("record", JSON.stringify(record));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "grp_id"
    },
    {
      title: "Group",
      dataIndex: "group_name",
      render: (text, record) => (
        <Link
          onClick={() => {
            offer_group_list(record);
          }}
          to={`/offer_groups/view/${record.grp_id}`}
        >
          {record.group_name}
        </Link>
      )
    },
    {
      title: "Status",
      dataIndex: "group_status",
      key: "group_status",
      render: (text, record) => (
        <span>
          <a>{record.group_status == 1 ? "Active" : "InActive"}</a>
        </span>
      )
    },
    {
      title: "Offers",
      dataIndex: "no_of_offers"
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Link
            to={{ pathname: `/offer_groups/edit/${record.grp_id}` }}
            onClick={() => {
              edit_group(record);
            }}
          >
            <Button type="link">Edit</Button>
          </Link>
        </div>
      )
    }
  ];

  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_group",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Groups List", response);
        setGroupsList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers List", error);
      });
  }, []);

  return (
    <div>
      <Helmet title="Offer Groups" />
      <div
        className="air__utils__heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* <div> */}
        <h2>Offer Groups</h2>
        {/* </div> */}

        {/* <div style={{ display: "flex", justifyContent: "right" }}> */}
        <Link to={`/offer_groups/create`}>
          <Button type="primary">Create Offer Group</Button>
        </Link>
        {/* </div> */}
      </div>
      <Table columns={columns} dataSource={groups_list} bordered />
    </div>
  );
};

export default OfferGroups;
