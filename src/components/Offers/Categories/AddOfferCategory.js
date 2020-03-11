import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Input, Tooltip, Icon, Button, Table } from "antd";
import axios from "axios";

const AddOfferCategory = () => {
  var offer_list = JSON.parse(localStorage.getItem("record"));
  //   console.log("chdbd", offer_list);

  const add_offer_category = () => {
    localStorage.setItem("offer_category", JSON.stringify(offer_list));
  };

  const [offer_categories_list, setOfferCategoryList] = useState();

  function rerender() {
    const config = {
      url: `https://api.linkswatch.io/offersapi/get_offerslist_by_cat/${offer_list.off_cat_id}`,
      //   data: bodyFormData,
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offer_Category List", response);
        setOfferCategoryList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers_by_category List", error);
      });
  }

  const DeleteRecord = record => {
    // console.log("jhcdc", record);
    const config = {
      url: `https://api.linkswatch.io/offersapi/offers_cat_add/${record.id}`,
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

  const columns = [
    {
      title: "Offer ID",
      dataIndex: "off_id"
    },
    {
      title: "Offer",
      dataIndex: "title"
    },
    {
      title: "Status",
      dataIndex: "offer_status",
      key: "offer_status",
      render: (text, record) => (
        // <span>
        <a>{record.offer_status == 1 ? "Active" : "InActive"}</a>
        // </span>
      )
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Button type="link" onClick={() => DeleteRecord(record)}>
          Remove
        </Button>
      )
    }
  ];

  useEffect(() => {
    // const bodyFormData = new FormData();
    // bodyFormData.append("grp_id", offer_list.grp_id);

    const config = {
      url: `https://api.linkswatch.io/offersapi/get_offerslist_by_cat/${offer_list.off_cat_id}`,
      //   data: bodyFormData,
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offer_Category List", response);
        setOfferCategoryList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers_by_category List", error);
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
        <h2>{offer_list.category_title}- Offer Category</h2>

        <Link
          to={`/offer_types/add_offer/${offer_list.off_cat_id}`}
          onClick={() => {
            add_offer_category();
          }}
        >
          <Button type="primary">Add Offer </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={offer_categories_list} bordered />
    </div>
  );
};

export default AddOfferCategory;
