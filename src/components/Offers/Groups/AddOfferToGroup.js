import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Tooltip, Icon, Button, Table, Select, Card } from "antd";
import axios from "axios";
import { compose } from "redux";
// import OfferGroups from "./OfferGroups";

const AddOffer = () => {
  let history = useHistory();
  const bodyFormData = new FormData();
  const { Option } = Select;
  var offer_group = JSON.parse(localStorage.getItem("offer_group"));
  // console.log("offfffffer", offer_group);

  const [offer_list, setOfferList] = useState([]);
  const [offer_id, setOfferID] = useState();

  function handleOffer(value) {
    console.log(`selected ${value}`);
    setOfferID(value);
  }

  function AddOfferToGroup() {
    bodyFormData.append("offer_id", offer_id);
    bodyFormData.append("grp_id", offer_group.grp_id);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_group_add",
      data: bodyFormData,
      method: "post",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        if (response.status == 200) {
          console.log("Added Offer to Group Response", response);
          history.push(`/offer_groups/view/${offer_group.grp_id}`);
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Adding Offer to Group", error);
      });
  }

  useEffect(() => {
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offers List", response);
        setOfferList(response.data.data);
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
        <h2>Add Offer: {offer_group.group_name}- Offer Group</h2>

        {/* </div> */}
      </div>
      <Card>
        <Form layout="inline">
          <Form.Item label="Offer" style={{ width: 360 }}>
            <Select
              defaultValue=""
              style={{ width: 240 }}
              onChange={handleOffer}
            >
              {offer_list.map(item => (
                <Option value={item.off_id}>{item.title}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        {/* <Link to={`/offers/add`}> */}
        <Button
          onClick={() => {
            AddOfferToGroup();
          }}
          type="primary"
        >
          Add
        </Button>
        {/* </Link> */}
      </Card>
    </div>
  );
};

export default AddOffer;
