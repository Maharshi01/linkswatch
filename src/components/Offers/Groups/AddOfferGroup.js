import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Input, Tooltip, Icon, Button, Table } from "antd";
import axios from "axios";

const AddOfferGroup = () => {
  var offer_list = JSON.parse(localStorage.getItem("record"));

  const add_offer_group = () => {
    localStorage.setItem("offer_group", JSON.stringify(offer_list));
  };

  function rerender() {
    const config = {
      url: `https://api.linkswatch.io/offersapi/get_offerslist_by_group/${offer_list.grp_id}`,
      //   data: bodyFormData,
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offer_Groups List", response);
        setOfferGroupsList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers_by_group List", error);
      });
  }

  const DeleteRecord = record => {
    // console.log("jhcdc", record);
    const config = {
      url: `https://api.linkswatch.io/offersapi/offers_group_add/${record.id}`,
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

  const [offer_groups_list, setOfferGroupsList] = useState();

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
    const config = {
      url: `https://api.linkswatch.io/offersapi/get_offerslist_by_group/${offer_list.grp_id}`,
      //   data: bodyFormData,
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offer_Groups List", response);
        setOfferGroupsList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers_by_group List", error);
      });

    // const bodyFormData = new FormData();
    // bodyFormData.append("grp_id", offer_list.grp_id);

    // const config = {
    //   url: "https://api.linkswatch.io/offersapi/get_offerslist_by_group",
    //   data: bodyFormData,
    //   method: "post",
    //   headers: {
    //     Authorization:
    //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
    //   }
    // };
    // axios(config)
    //   .then(response => {
    //     console.log("Got Offer_Groups List", response);
    //     setOfferGroupsList(response.data.data);
    //   })
    //   // Error handling
    //   .catch(error => {
    //     alert(error);
    //     console.log("Error While Getting Offers_by_group List", error);
    //   });
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
        <h2>{offer_list.group_name}- Offer Group</h2>

        <Link
          to={`/offer_groups/add_offer/${offer_list.grp_id}`}
          onClick={() => {
            add_offer_group();
          }}
        >
          <Button type="primary">Add Offer </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={offer_groups_list} bordered />
    </div>
  );
};

export default AddOfferGroup;
