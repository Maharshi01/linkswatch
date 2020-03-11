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
import { app } from "firebase";
import { func } from "prop-types";

const OfferApplications = () => {
  let history = useHistory();

  const [applications_list, setApplicationsList] = useState();
  const [app_ids, setAppIds] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const formdata = new FormData();

  const onSelectChange = selectedRowKeys => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj.off_app_id) {
        return i;
      }
    }
    return -1;
  }

  const onSelectall = (selected, selectedRows) => {
    console.log("selected: ", selectedRows);
    if (selectedRows.length == 0) {
      // app_ids = [];
      // console.log("Whaaattt");
      setAppIds([]);
    } else {
      for (let i = 0; i < selectedRows.length; i++) {
        app_ids.push(selectedRows[i].off_app_id);
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectChange(selectedRowKeys, selectedRows);
    },

    onSelect: record => {
      const a = containsObject(record, app_ids);
      if (a != -1) {
        app_ids.splice(a, 1);
        // console.log("Spliced app_ids", app_ids);
      } else {
        app_ids.push(record.off_app_id);
        // console.log("Pushed app_ids", app_ids);
      }
    },
    onSelectAll: (selected, selectedRows) =>
      onSelectall(selected, selectedRows),
    hideDefaultSelections: true
  };

  function Approve() {
    console.log("app_ids", app_ids);
    formdata.append("id", app_ids);
    // formdata.append("group_status", group_status);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_applications_approve",
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
          console.log("Approved", response);
          // history.push("/offer_access/applications");
          setSelectedRowKeys([]);
          reRender();
          // history.push("/offer_groups");
        }
      })
      .catch(error => {
        console.log("Error", error);
        alert(error);
        console.log("Error While Approving", error);
      });
  }
  function Deny() {
    // console.log("app_ids", app_ids);
    formdata.append("id", app_ids);
    // formdata.append("group_status", group_status);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_applications_deny",
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
          console.log("Denied", response);
          setSelectedRowKeys([]);
          reRender();

          // history.push("/offer_groups");
        }
      })
      .catch(error => {
        console.log("Error", error);
        alert(error);
        console.log("Error While Denying", error);
      });
  }

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          <a>{record.status == 1 ? "Active" : "Pending"}</a>
        </span>
      )
    },
    {
      title: "Offer ID",
      dataIndex: "offer_id"
    },
    {
      title: "Offer Name",
      dataIndex: "offer_title"
    },
    {
      title: "Partner",
      dataIndex: "first_name"
    }
  ];

  function reRender() {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_applications",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Applications List", response);
        setApplicationsList(response.data.data);
      })
      // Error handling
      .catch(error => {
        console.log("Error While Getting Applications List", error);
        alert(error);
      });
  }
  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_applications",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Applications List", response);
        setApplicationsList(response.data.data);
      })
      // Error handling
      .catch(error => {
        console.log("Error While Getting Applications List", error);
        alert(error);
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
        <h2>Offer Applications</h2>
        {/* </div> */}

        {/* </div> */}
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={applications_list}
        bordered
      />
      {hasSelected == true && (
        <Form className="inline">
          <Form.Item></Form.Item>
          <Button
            type="primary"
            onClick={() => {
              Approve();
            }}
          >
            Approve
          </Button>
          <Form.Item></Form.Item>
          <Button
            type="primary"
            onClick={() => {
              Deny();
            }}
          >
            Deny
          </Button>
          <Form.Item></Form.Item>
        </Form>
      )}
    </div>
  );
};

export default OfferApplications;
