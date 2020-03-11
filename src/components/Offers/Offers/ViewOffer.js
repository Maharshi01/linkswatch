import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Form, Input, Tooltip, Card, Icon, Button } from "antd";
import { func } from "prop-types";
const ViewOffer = () => {
  var view_offer = JSON.parse(localStorage.getItem("record"));
  console.log("view_offer", view_offer);

  const [offer_value, setValue] = useState();

  const localset = v => {
    let offer_details = {
      off_id: view_offer.off_id,
      offer_value: v
    };
    localStorage.setItem("offer_details", JSON.stringify(offer_details));
  };
  const offer_det = () => {
    setValue(1);
    localset(1);
  };
  const offer_pay = () => {
    setValue(2);
    // localStorage.setItem("offer_details", JSON.stringify(offer_details));
    localset(2);
  };
  const offer_set = () => {
    setValue(3);
    localset(3);
    // localStorage.setItem("offer_details", JSON.stringify(offer_details));
  };
  const offer_track = () => {
    setValue(4);
    // localStorage.setItem("offer_details", JSON.stringify(offer_details));
    localset(4);
  };
  const offer_link = () => {
    setValue(5);
    // localStorage.setItem("offer_details", JSON.stringify(offer_details));
    localset(5);
  };
  return (
    <div>
      <Helmet title="Offer -CreateOffer" />
      <div className="air__utils__heading">
        <h2>{view_offer.title}</h2>
      </div>
      <div className="d-flex flex-row">
        <div className="p-2">
          <Card
            title={<h5 style={{ fontWeight: 600 }}>Details</h5>}
            style={{ width: 600 }}
            extra={
              <Link
                onClick={() => offer_det()}
                to={`/offers/edit/${view_offer.off_id}`}
              >
                <Button type="primary">Edit</Button>
              </Link>
            }
          >
            <Form layout="inline">
              <Form.Item label="ID:">
                <p>{view_offer.off_id}</p>
              </Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Advertiser:">{view_offer.company}</Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Name:">{view_offer.title}</Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Incentive:">{view_offer.incentive}</Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Vertical:">{view_offer.vertical}</Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Media Placements:">
                {view_offer.media_placement}
              </Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Category:">
                {view_offer.category_title}
              </Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Description:">
                {view_offer.description_text}
              </Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Preview:">{view_offer.preview_url}</Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Status:">
                {view_offer.offer_status == 1 ? "Active" : "Inactive"}
              </Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Expires:">
                {view_offer.expiration_date}
              </Form.Item>
            </Form>
            <Form layout="inline">
              <Form.Item label="Protocol:">
                {view_offer.conversion_tracking}
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div>
          <div className="p-2">
            <Card
              title={<h5 style={{ fontWeight: 600 }}>Payout </h5>}
              style={{ width: 600 }}
              extra={
                <Link
                  onClick={() => offer_pay()}
                  to={`/offers/edit/${view_offer.off_id}`}
                >
                  <Button type="primary">Edit</Button>
                </Link>
              }
            >
              <Form layout="inline">
                <Form.Item label="Currency:">
                  <p>{view_offer.currency}</p>
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Revenue :">
                  {view_offer.revenue_per_conversion}
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Payout:">
                  {view_offer.cost_per_conversion}
                </Form.Item>
              </Form>
            </Card>
          </div>
          <div className="p-2">
            <Card
              title={<h5 style={{ fontWeight: 600 }}>Settings </h5>}
              style={{ width: 600 }}
              extra={
                <Link
                  type="primary"
                  onClick={() => offer_set()}
                  to={`/offers/edit/${view_offer.off_id}`}
                >
                  <Button type="primary">Edit</Button>
                </Link>
              }
            >
              <Form layout="inline">
                <Form.Item label="Private Offer:">
                  <p>{view_offer.private == 1 ? "Enabled" : "Disabled"}</p>
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Caps:">
                  <p>{view_offer.caps == 1 ? "Enabled" : "Disabled"}</p>
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Email Instructions:">
                  <p>
                    {view_offer.email_instructions == 1
                      ? "Enabled"
                      : "Disabled"}
                  </p>
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Suppression List:">
                  <p>
                    {view_offer.suppression_list_status == 1
                      ? "Enabled"
                      : "Disabled"}
                  </p>
                </Form.Item>
              </Form>
            </Card>
          </div>
          <div className="p-2">
            <Card
              title={<h5 style={{ fontWeight: 600 }}>Tracking </h5>}
              style={{ width: 600 }}
              extra={
                <Link
                  type="primary"
                  onClick={() => offer_track()}
                  to={`/offers/edit/${view_offer.off_id}`}
                >
                  <Button type="primary">Edit</Button>
                </Link>
              }
            >
              <Form layout="inline">
                <Form.Item label="Tracking Domain:">
                  <p>{view_offer.tracking_domain}</p>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <Card
          title={<h5 style={{ fontWeight: 600 }}>Links</h5>}
          style={{ width: "100%" }}
          extra={
            <Link
              onClick={() => offer_link()}
              to={`/offers/edit/${view_offer.off_id}`}
            >
              <Button type="primary">Edit</Button>
            </Link>
          }
        >
          <Form layout="inline">
            <Form.Item label="Url:">
              <p>{view_offer.url}</p>
            </Form.Item>
          </Form>
          <Form layout="inline">
            <Form.Item label="Preview Url:">
              <p>{view_offer.preview_url}</p>
            </Form.Item>
          </Form>
          <Form layout="inline">
            <Form.Item label="Android Url:">
              <p>{view_offer.android_url}</p>
            </Form.Item>
          </Form>
          <Form layout="inline">
            <Form.Item label="Ios Url:">
              <p>{view_offer.ios_url}</p>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default ViewOffer;
