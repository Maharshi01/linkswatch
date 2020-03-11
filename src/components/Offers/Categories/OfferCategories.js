import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Button, Table } from "antd";
import axios from "axios";
// import CreateCategory from "./CreateCategory";

const OfferCategories = () => {
  const [category_list, setCategoryList] = useState([]);

  const offer_category_list = record => {
    localStorage.setItem("record", JSON.stringify(record));
  };

  const edit_category = record => {
    // console.log("record", record);
    localStorage.setItem("record", JSON.stringify(record));

    console.log("Categorytitle", record);
  };

  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_category",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Category List", response);
        setCategoryList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers List", error);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "off_cat_id"
    },
    {
      title: "Category",
      dataIndex: "category_title",
      render: (text, record) => (
        <Link
          onClick={() => {
            offer_category_list(record);
          }}
          to={`/offer_types/view/${record.off_cat_id}`}
        >
          {record.category_title}
        </Link>
      )
    },
    {
      title: "Status",
      dataIndex: "off_cat_status",
      key: "off_cat_status",
      render: (text, record) => (
        <span>
          <a>{record.off_cat_status == 1 ? "Active" : "InActive"}</a>
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
        <Link
          to={{ pathname: `/offer_types/edit/${record.off_cat_id}` }}
          onClick={() => {
            edit_category(record);
          }}
        >
          <Button type="link">Edit</Button>
        </Link>
      )
    }
  ];
  return (
    <div>
      <Helmet title="Offer Categories" />
      <div
        className="air__utils__heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* <div> */}
        <h2>Offer Categories</h2>
        {/* </div> */}

        {/* <div style={{ display: "flex", justifyContent: "right" }}> */}
        <Link to={`/offer_types/create`}>
          <Button type="primary">Create Offer Category</Button>
        </Link>
        {/* </div> */}
      </div>
      <Table
        rowKey={record => record.off_cat_id}
        columns={columns}
        dataSource={category_list}
        bordered
      />
    </div>
  );
};

export default OfferCategories;
