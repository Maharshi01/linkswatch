import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import moment from "moment";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Card,
  Button,
  Collapse,
  Select,
  DatePicker
} from "antd";
import axios from "axios";
import { CountryCodes } from "../CountryCodes";
import { TimeZone } from "../../../TimeZone";

const EditOffer = () => {
  const { Option } = Select;
  const { TextArea } = Input;
  let history = useHistory();
  const { Panel } = Collapse;

  var offer_details = JSON.parse(localStorage.getItem("offer_details"));

  const [offer_data, setOfferData] = useState([]);

  const [advertisers_list, setAdvertisersList] = useState([]);
  const [category_list, setCategoryList] = useState([]);
  const [groups_list, setGroupsList] = useState([]);
  const [edit_advertiser, setAdvertiser] = useState();
  const [edit_title, setTitle] = useState();
  const [channel, setChannel] = useState();
  const [operating_system, setOS] = useState();
  const [incentive, setIncentive] = useState();
  const [vertical, setVertical] = useState();
  const [conversion_type, setConversionType] = useState();
  const [media_placement, setMediaPlacement] = useState();
  const [description_text, setDescription] = useState();
  const [conversion_tracking, setConversionTrack] = useState();
  const [expiration_date, setDate] = useState();
  const [offer_category, setCategory] = useState();
  const [group_id, setGroup] = useState();
  const [reference_id, setReferenceID] = useState();
  const [revenue_type, setRevenueType] = useState();
  const [revenue_per_conversion, setRevenue] = useState();
  const [payout_type, setPayoutType] = useState();
  const [cost_per_conversion, setPayoutCost] = useState();
  const [customcurrency, setCustomCurrency] = useState("disabled");
  const [currency, setCountry] = useState();
  const [private_id, setPrivate] = useState();
  const [caps, setCaps] = useState();
  const [daily_conversions, setDailyConversions] = useState();
  const [monthly_conversions, setMonthlyConversions] = useState();
  const [lifetime_conversions, setLifetimeConversions] = useState();
  const [daily_payout, setDailyPayout] = useState();
  const [monthly_payout, setMonthlyPayout] = useState();
  const [lifetime_payout, setLifetimePayout] = useState();
  const [daily_revenue, setDailyRevenue] = useState();
  const [monthly_revenue, setMonthlyRevenue] = useState();
  const [lifetime_revenue, setLifetimeRevenue] = useState();
  const [email_instructions, setEmailInstructions] = useState();
  const [approved_from_lines, setApprovedFromLines] = useState();
  const [approved_subject_lines, setApprovedSubjectLines] = useState();
  const [suppression_list, setSuppressionList] = useState([]);
  const [suppression_list_status, setSuppression] = useState();
  const [suppression_name, setSuppressionName] = useState();
  const [domain_list, setDomainList] = useState([]);
  const [tracking_domain, setTrackingDomain] = useState();
  const [url, setURL] = useState();
  const [preview_url, setPreviewURL] = useState();
  const [android_url, setAndroidURL] = useState();
  const [ios_url, setIOSURL] = useState();
  const [urls, setOfferUrl] = useState([]);
  const [offer_rotation, setOfferRotation] = useState([]);
  const [other, setOtherUrls] = useState([]);
  const [symbol, setSymbol] = useState("US$");

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
        console.log("Got Cat List", response.data.data);
        setCategoryList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers_Categories List", error);
      });

    const config1 = {
      url: "https://api.linkswatch.io/Offersapi/offers_group",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config1)
      .then(response => {
        console.log("Got Groups List", response);
        setGroupsList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers List", error);
      });

    const config2 = {
      url: "https://api.linkswatch.io/Admin_Advertisers/get_advertisersOffers",
      method: "get", //Method
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config2)
      .then(response => {
        // console.log("Response", response);
        console.log("Advertisers List", response.data.status);
        setAdvertisersList(response.data.status);
      })
      .catch(err => {
        alert(err);
        console.log("Error response", err.response);
      });

    const config3 = {
      url: `https://api.linkswatch.io/Offersapi/offers/${offer_details.off_id}`,
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config3)
      .then(response => {
        console.log("Got Offer Data", response.data.data[0]);
        setOfferData(response.data.data[0]);
        setAdvertiser(response.data.data[0].advertiser_id);
        setTitle(response.data.data[0].title);
        setChannel(response.data.data[0].channel);
        setOS(response.data.data[0].operating_system);
        setIncentive(response.data.data[0].incentive);
        setVertical(response.data.data[0].vertical);
        setConversionType(response.data.data[0].conversion_type);
        setMediaPlacement(response.data.data[0].media_placement);
        setDescription(response.data.data[0].description_text);
        setConversionTrack(response.data.data[0].conversion_tracking);
        setDate(response.data.data[0].expiration_date);
        setCategory(response.data.data[0].offer_category);
        setGroup(response.data.data[0].group_id);
        setReferenceID(response.data.data[0].reference_id);
        setCountry(response.data.data[0].currency);
        for (let i = 0; i < CountryCodes.length; i++) {
          if (CountryCodes[i].name == response.data.data[0].currency) {
            setSymbol(CountryCodes[i].symbol);
          }
        }
        setPayoutType(response.data.data[0].payout_type);
        setRevenueType(response.data.data[0].revenue_type);
        setPayoutCost(response.data.data[0].cost_per_conversion);
        setRevenue(response.data.data[0].revenue_per_conversion);
        setPrivate(response.data.data[0].private);
        setCaps(response.data.data[0].caps);
        setDailyConversions(response.data.data[0].daily_conversions);
        setMonthlyConversions(response.data.data[0].monthly_conversions);
        setLifetimeConversions(response.data.data[0].lifetime_conversions);
        setDailyPayout(response.data.data[0].daily_payout);
        setMonthlyPayout(response.data.data[0].monthly_payout);
        setLifetimePayout(response.data.data[0].lifetime_payout);
        setDailyRevenue(response.data.data[0].daily_revenue);
        setMonthlyRevenue(response.data.data[0].monthly_revenue);
        setLifetimeRevenue(response.data.data[0].lifetime_revenue);
        setEmailInstructions(response.data.data[0].email_instructions);
        setApprovedFromLines(response.data.data[0].approved_from_lines);
        setApprovedSubjectLines(response.data.data[0].approved_subject_lines);
        setSuppression(response.data.data[0].suppression_list_status);
        setSuppressionName(response.data.data[0].suppression_name);
        setTrackingDomain(response.data.data[0].tracking_domain);
        setURL(response.data.data[0].url);
        setPreviewURL(response.data.data[0].preview_url);
        setAndroidURL(response.data.data[0].android_url);
        setIOSURL(response.data.data[0].ios_url);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offer Data", error);
      });

    const config4 = {
      url: "https://api.linkswatch.io/Offersapi/offers_suppression_list",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config4)
      .then(response => {
        console.log("Got Suppression List", response.data.data);
        setSuppressionList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Suppression List", error);
      });

    const config5 = {
      url: "https://api.linkswatch.io/Adminapi/trackingGetDomains",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config5)
      .then(response => {
        console.log("Got  Domain List", response.data.data);
        setDomainList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Domains List", error);
      });

    const config6 = {
      url: ` https://api.linkswatch.io/offersapi/other_url/${offer_details.off_id}`,
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config6)
      .then(response => {
        console.log("Got Other_Urls List", response.data.data);

        for (let i = 0; i < response.data.data.length; i++) {
          const values = [...urls];
          const values1 = [...offer_rotation];
          values.push({ value: response.data.data[i].other_url });
          setOfferUrl(urls => [...urls, ...values]);
          values1.push({
            value: response.data.data[i].offer_rotation_url
          });
          setOfferRotation(offer_rotation => [...offer_rotation, ...values1]);
        }
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Other_urls List", error);
      });
  }, []);

  function onSearch(val) {
    console.log("search:", val);
  }
  function handleAdvertiser(value) {
    console.log(`selected ${value}`);
    setAdvertiser(value);
  }
  function handleChannel(value) {
    console.log(`selected ${value}`);
    setChannel(value);
  }
  function handleOS(value) {
    console.log(`selected ${value}`);
    setOS(value);
  }
  function handleIncentive(value) {
    console.log(`selected ${value}`);
    setIncentive(value);
  }
  function handleVertical(value) {
    console.log(`selected ${value}`);
    setVertical(value);
  }
  function handleConversionType(value) {
    console.log(`selected ${value}`);
    setConversionType(value);
  }
  function handleMedia(value) {
    console.log(`selected ${value}`);
    setMediaPlacement(value);
  }
  const handleDescription = desc => {
    setDescription(desc);
  };
  function handleTracking(value) {
    console.log(`selected ${value}`);
    setConversionTrack(value);
  }
  function handleDate(date, dateString) {
    console.log("date", date, dateString);
    setDate(dateString);
  }
  function handleCategories(value) {
    console.log(`selected ${value}`);
    setCategory(value);
  }
  function handleGroups(value) {
    console.log(`selected ${value}`);
    setGroup(value);
  }
  const handleReferenceID = id => {
    setReferenceID(id);
  };
  function handleCustomCurrency(value) {
    console.log(`selected ${value}`);
    setCustomCurrency(value);
  }
  function handleCurrency(value) {
    console.log(`selected ${value}`);
    setCountry(value);
    for (let i = 0; i < CountryCodes.length; i++) {
      if (CountryCodes[i].name == value) {
        setSymbol(CountryCodes[i].symbol);
      }
    }
  }
  function handleRevenueType(value) {
    console.log(`selected ${value}`);
    setRevenueType(value);
  }
  const handleRevenue = amount => {
    setRevenue(amount);
  };
  function handlePayoutType(value) {
    console.log(`selected ${value}`);
    setPayoutType(value);
  }
  const handlePayout = amount => {
    setPayoutCost(amount);
  };
  const handlePrivate = value => {
    console.log(`selected ${value}`);
    setPrivate(value);
  };
  const handleCaps = value => {
    console.log(`selected ${value}`);
    setCaps(value);
  };
  const handleEmailInstructions = value => {
    console.log(`selected ${value}`);
    setEmailInstructions(value);
  };
  const handleSuppression = value => {
    console.log(`selected ${value}`);
    setSuppression(value);
  };
  function handleSuppressionName(value) {
    console.log(`selected ${value}`);
    setSuppressionName(value);
  }
  function handleTrackingDomain(value) {
    console.log(`selected ${value}`);
    setTrackingDomain(value);
  }
  function handleAddUrl() {
    const values = [...urls];
    values.push({ value: "" });
    setOfferUrl(values);
  }
  function handleAddRotation() {
    const values = [...offer_rotation];
    values.push({ value: "" });
    setOfferRotation(values);
  }
  function handleRemoveUrl(i) {
    const values = [...urls];
    values.splice(i, 1);
    setOfferUrl(values);
  }
  function handleRemoveRotation(i) {
    const values = [...offer_rotation];
    values.splice(i, 1);
    setOfferRotation(values);
  }
  function handleChangeUrl(i, event) {
    const values = [...urls];
    values[i].value = event.target.value;
    console.log("handleChangeUrl", values);
    setOfferUrl(values);
  }
  function handleChangeOffer(i, event) {
    const values = [...offer_rotation];
    values[i].value = event.target.value;
    console.log("handleChangeOffer", values);
    setOfferRotation(values);
  }
  const saveForm = () => {
    const data = {
      advertiser_id: edit_advertiser,
      title: edit_title,
      channel: channel,
      operating_system: operating_system,
      incentive: incentive,
      vertical: vertical,
      conversion_type: conversion_type,
      media_placement: media_placement,
      description_text: description_text,
      expiration_date: expiration_date,
      offer_category: offer_category,
      group_id: group_id,
      reference_id: reference_id,
      currency: currency,
      payout_type: payout_type,
      cost_per_conversion: cost_per_conversion,
      revenue_type: revenue_type,
      revenue_per_conversion: revenue_per_conversion,
      private: private_id,
      caps: caps,
      email_instructions: email_instructions,
      suppression_list_status: suppression_list_status,
      daily_conversions: caps == 1 ? daily_conversions : "",
      monthly_conversions: caps == 1 ? monthly_conversions : "",
      lifetime_conversions: caps == 1 ? lifetime_conversions : "",
      daily_payout: caps == 1 ? daily_payout : "",
      monthly_payout: caps == 1 ? monthly_payout : "",
      lifetime_payout: caps == 1 ? lifetime_payout : "",
      daily_revenue: caps == 1 ? daily_revenue : "",
      monthly_revenue: caps == 1 ? monthly_revenue : "",
      lifetime_revenue: caps == 1 ? lifetime_revenue : "",
      approved_from_lines: email_instructions == 1 ? approved_from_lines : "",
      approved_subject_lines:
        email_instructions == 1 ? approved_subject_lines : "",
      suppression_name: suppression_list_status == 1 ? suppression_name : "",
      tracking_domain: tracking_domain,
      url: url,
      preview_url: preview_url,
      android_url: android_url,
      ios_url: ios_url
    };
    const config = {
      url: `https://api.linkswatch.io/Offersapi/offers/${offer_data.off_id}`,
      data: data,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Updated Offer Response", response);
        history.push("/offers_list");
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <div>
      <Helmet title=" Offer Details" />

      <div>
        <div>
          {offer_details.offer_value == 1 ? (
            <div>
              <div className="air__utils__heading">
                <h2>Offer Details: {offer_data.title} -Offer</h2>
              </div>
              <Collapse
                // defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel header="Details" key="1">
                  <Form layout="horizontal">
                    {/* Advertisers */}
                    <Form.Item label="Advertiser" style={{ width: 360 }}>
                      <Select
                        value={edit_advertiser}
                        showSearch
                        defaultValue=""
                        style={{ width: 240 }}
                        onChange={handleAdvertiser}
                        optionFilterProp="children"
                        showSearch
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {advertisers_list.map(item => (
                          <Option value={item.adv_id} key={item.adv_id}>
                            {item.company}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {/* Title */}
                    <Form.Item label="Title" style={{ width: 360 }}>
                      <Input
                        value={edit_title}
                        onChange={e => {
                          setTitle(e.target.value);
                        }}
                      />
                    </Form.Item>
                    {/* Channel & Operating System */}
                    <Form.Item label="Channel">
                      <Select
                        value={channel}
                        style={{ width: 240 }}
                        onChange={handleChannel}
                      >
                        <Option value="desktop/web">Desktop/Web</Option>
                        <Option value="mobile">Mobile</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Operating System">
                      <Select
                        value={operating_system}
                        style={{ width: 240 }}
                        onChange={handleOS}
                      >
                        <Option value="amazon">Amazon</Option>
                        <Option value="android">Android</Option>
                        <Option value="ios">IOS</Option>
                        <Option value="macos">MacOS</Option>
                        <Option value="windows">Windows</Option>
                      </Select>
                    </Form.Item>
                    {/* Incentive,Vertical & Conversion Type */}
                    <Form.Item label="Incentive">
                      <Select
                        value={incentive}
                        style={{ width: 240 }}
                        onChange={handleIncentive}
                        optionFilterProp="children"
                        showSearch
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="incent">Incent</Option>
                        <Option value="non-incent">Non-Incent</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Vertical">
                      <Select
                        showSearch
                        value={vertical}
                        style={{ width: 240 }}
                        onChange={handleVertical}
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="adult">Adult</Option>
                        <Option value="automotive">Automotive</Option>
                        <Option value="bizopp">Biz Opp</Option>
                        <Option value="coupons">Coupons</Option>
                        <Option value="education">Education</Option>
                        <Option value="games">Games</Option>
                        <Option value="utilities">Utilities</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Conversion Type">
                      <Select
                        value={conversion_type}
                        style={{ width: 240 }}
                        onChange={handleConversionType}
                        optionFilterProp="children"
                        showSearch
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="app-event">App Event</Option>
                        <Option value="app-install">App Install</Option>
                        <Option value="email-submit">Email Submit</Option>
                        <Option value="zip-submit">Zip Submit</Option>
                      </Select>
                    </Form.Item>
                    {/* Media Placement */}
                    <Form.Item label="Media Placement">
                      <Select
                        value={media_placement}
                        style={{ width: 360 }}
                        onChange={handleMedia}
                        optionFilterProp="children"
                        showSearch
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="auto-redirect">Auto-Redirect</Option>
                        <Option value="blog">Blog</Option>
                        <Option value="email">Email</Option>
                        <Option value="toobar">Toolbar</Option>
                        <Option value="video">Video</Option>
                      </Select>
                    </Form.Item>
                    {/* Description */}
                    <Form.Item label="Description" style={{ width: 560 }}>
                      <TextArea
                        rows={4}
                        value={description_text}
                        onChange={e => {
                          handleDescription(e.target.value);
                        }}
                        placeholder="Enter Description"
                      />
                    </Form.Item>
                    {/* Conversion Tracking */}
                    <Form.Item label="Conversion Tracking">
                      <Select
                        value={conversion_tracking}
                        style={{ width: 240 }}
                        onChange={handleTracking}
                      >
                        <Option value="server-postback-w/-transaction-ID">
                          Server Postback w/ Transaction ID
                        </Option>
                        <Option value="server-postback-w/-partner-ID">
                          Server Postback w/ Partner ID
                        </Option>
                        <Option value="https-image-pixel">
                          HTTPS Image Pixel
                        </Option>
                        <Option value="https-iframe-pixel">
                          HTTPS iFrame Pixel
                        </Option>
                        <Option value="http-image-pixel">
                          HTTP Image Pixel
                        </Option>
                        <Option value="http-iframe-pixel">
                          HTTP iFrame Pixel
                        </Option>
                      </Select>
                    </Form.Item>
                    {/* Expiration Date */}
                    <Form.Item label="Expiration Date" style={{ width: 360 }}>
                      <DatePicker
                        value={moment(expiration_date)}
                        onChange={handleDate}
                      />
                    </Form.Item>
                    {/* Categories and Groups */}
                    <Form.Item label="Categories" style={{ width: 360 }}>
                      <Select
                        showSearch
                        value={offer_category}
                        style={{ width: 240 }}
                        onChange={handleCategories}
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {category_list.map(item => (
                          <Option key={item.off_cat_id} value={item.off_cat_id}>
                            {item.category_title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Groups" style={{ width: 360 }}>
                      <Select
                        showSearch
                        value={group_id}
                        style={{ width: 240 }}
                        onChange={handleGroups}
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {groups_list.map(item => (
                          <Option key={item.grp_id} value={item.grp_id}>
                            {item.group_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {/* Reference ID */}
                    <Form.Item label="Reference ID" style={{ width: 360 }}>
                      <Input
                        value={reference_id}
                        onChange={e => {
                          handleReferenceID(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          {offer_details.offer_value == 2 ? (
            <div>
              <div className="air__utils__heading">
                <h2>Offer Payout: {offer_data.title} -Offer</h2>
              </div>
              <Collapse
                // defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel header="Payout" key="1">
                  {/* Custom Currency */}
                  <Form layout="horizontal">
                    <Form.Item label="Custom Currency">
                      <Select
                        defaultValue="disabled"
                        style={{ width: 360 }}
                        onChange={handleCustomCurrency}
                      >
                        <Option value="disabled">Disabled</Option>
                        <Option value="enabled">Enabled</Option>
                      </Select>
                    </Form.Item>
                    {customcurrency == "enabled" ? (
                      <Form.Item label="Custom Currency">
                        <Select
                          // labelInValue
                          showSearch
                          showArrow
                          defaultValue=""
                          style={{ width: 240 }}
                          onChange={handleCurrency}
                          optionFilterProp="children"
                          onSearch={onSearch}
                          // onSelect={key => onSelect(key)}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {CountryCodes.map((item, index) => (
                            <Option key={index} value={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      ""
                    )}
                  </Form>

                  <Form layout="horizontal">
                    {/* Payout Type */}
                    <Form.Item label="Payout Type">
                      <Select
                        value={payout_type}
                        style={{ width: 480 }}
                        onChange={handlePayoutType}
                      >
                        <Option value="CPA">Cost Per Conversion(CPA)</Option>
                        <Option value="CPS">Cost per Sale(CPS)</Option>
                        <Option value="CPA+CPS">
                          Cost per Conversion plus Cost per Sale (CPA + CPS)
                        </Option>
                        <Option value="CPC">Cost per Click</Option>
                        <Option value="CPM">
                          Cost per Thousand Impressions(CPM)
                        </Option>
                      </Select>
                    </Form.Item>
                    {/* Cost Per Conversion */}
                    <Form.Item
                      label="Cost Per Conversion"
                      style={{ width: 360 }}
                    >
                      <Input
                        value={cost_per_conversion}
                        addonBefore={symbol}
                        onChange={e => {
                          handlePayout(e.target.value);
                        }}
                        // placeholder="Enter Cost Per Conversion"
                      />
                    </Form.Item>
                  </Form>

                  <Form layout="horizontal">
                    {/* Revenue Type */}
                    <Form.Item label="Revenue Type">
                      <Select
                        value={revenue_type}
                        style={{ width: 480 }}
                        onChange={handleRevenueType}
                      >
                        <Option value="RPA">Revenue Per Conversion(RPA)</Option>
                        <Option value="RPS">Revenue per Sale(RPS)</Option>
                        <Option value="RPA+RPS">
                          Revenue per Conversion plus Revenue per Sale (RPA +
                          RPS)
                        </Option>
                        <Option value="RPC">Revenue per Click(RPC)</Option>
                        <Option value="RPM">
                          Revenue per Thousand Impressions(RPM)
                        </Option>
                      </Select>
                    </Form.Item>
                    {/* Revenue Per Conversion */}
                    <Form.Item
                      label="Revenue Per Conversion"
                      style={{ width: 360 }}
                    >
                      <Input
                        addonBefore={symbol}
                        value={revenue_per_conversion}
                        onChange={e => {
                          handleRevenue(e.target.value);
                        }}
                        // placeholder="Enter Revenue Per Conversion"
                        // prefix={
                        //   <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                        // }
                        // suffix={
                        //   <Tooltip title="Extra information">
                        //     <Icon
                        //       type="info-circle"
                        //       style={{ color: "rgba(0,0,0,.45)" }}
                        //     />
                        //   </Tooltip>
                        // }
                      />
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          {offer_details.offer_value == 3 ? (
            <div>
              <div className="air__utils__heading">
                <h2>Offer Settings: {offer_data.title} -Offer</h2>
              </div>
              <Collapse
                // defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {/* Settings Panel */}
                <Panel header="Settings" key="1">
                  <Form layout="horizontal">
                    {/* Daily Conversions */}
                    <Form.Item label="Private">
                      <Select
                        value={private_id}
                        style={{ width: 360 }}
                        onChange={handlePrivate}
                      >
                        <Option value="0">Disabled</Option>
                        <Option value="1">Enabled</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Caps">
                      <Select
                        value={caps}
                        style={{ width: 360 }}
                        onChange={handleCaps}
                      >
                        <Option value="0">Disabled</Option>
                        <Option value="1">Enabled</Option>
                      </Select>
                    </Form.Item>
                    {caps == 1 ? (
                      <Form layout="vertical">
                        <Form.Item
                          label=" Daily Conversions:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={daily_conversions}
                            onChange={e => {
                              setDailyConversions(e.target.value);
                            }}
                            // placeholder="Daily Conversions"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Monthly Conversions:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={monthly_conversions}
                            onChange={e => {
                              setMonthlyConversions(e.target.value);
                            }}
                            // placeholder="Monthly Conversions"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Lifetime Conversions:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={lifetime_conversions}
                            onChange={e => {
                              setLifetimeConversions(e.target.value);
                            }}
                            // placeholder="Lifetime Conversions"
                          />
                        </Form.Item>
                        <Form.Item label="Daily Payout:" style={{ width: 240 }}>
                          <Input
                            value={daily_payout}
                            onChange={e => {
                              setDailyPayout(e.target.value);
                            }}
                            // placeholder="Daily Payout"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Monthly Payout:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={monthly_payout}
                            onChange={e => {
                              setMonthlyPayout(e.target.value);
                            }}
                            // placeholder="Monthly Payout"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Lifetime Payout:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={lifetime_payout}
                            onChange={e => {
                              setLifetimePayout(e.target.value);
                            }}
                            // placeholder="Lifetime Payout"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Daily Revenue:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={daily_revenue}
                            onChange={e => {
                              setDailyRevenue(e.target.value);
                            }}
                            // placeholder="Daily Revenue"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Monthly Revenue:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={monthly_revenue}
                            onChange={e => {
                              setMonthlyRevenue(e.target.value);
                            }}
                            // placeholder="Monthly Revenue"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Lifetime Revenue:"
                          style={{ width: 240 }}
                        >
                          <Input
                            value={lifetime_revenue}
                            onChange={e => {
                              setLifetimeRevenue(e.target.value);
                            }}
                            // placeholder="Lifetime Revenue"
                          />
                        </Form.Item>
                      </Form>
                    ) : (
                      ""
                    )}
                    <Form.Item label="Email Instructions">
                      <Select
                        value={email_instructions}
                        style={{ width: 360 }}
                        onChange={handleEmailInstructions}
                      >
                        <Option value="0">Disabled</Option>
                        <Option value="1">Enabled</Option>
                      </Select>
                    </Form.Item>
                    {email_instructions == 1 ? (
                      <Form layout="vertical">
                        <Form.Item
                          label="Approved From Lines:"
                          style={{ width: 360 }}
                        >
                          <TextArea
                            rows={1}
                            value={approved_from_lines}
                            onChange={e => {
                              setApprovedFromLines(e.target.value);
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Approved Subject Lines:"
                          style={{ width: 360 }}
                        >
                          <TextArea
                            rows={1}
                            value={approved_subject_lines}
                            onChange={e => {
                              setApprovedSubjectLines(e.target.value);
                            }}
                          />
                        </Form.Item>
                      </Form>
                    ) : (
                      ""
                    )}
                    <Form layout="inline">
                      <Form.Item label="Suppression List:">
                        <Select
                          value={suppression_list_status}
                          style={{ width: 180 }}
                          onChange={handleSuppression}
                        >
                          <Option value="0">Disabled</Option>
                          <Option value="1">Enabled</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item>
                        {suppression_list_status == 1 ? (
                          <Form>
                            <Select
                              showSearch
                              value={suppression_name}
                              style={{ width: 240 }}
                              onChange={handleSuppressionName}
                              optionFilterProp="children"
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {suppression_list.map(item => (
                                <Option
                                  key={item.sup_list_id}
                                  value={item.sup_list_id}
                                >
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form>
                        ) : (
                          ""
                        )}
                      </Form.Item>
                    </Form>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          {offer_details.offer_value == 4 ? (
            <div>
              <div className="air__utils__heading">
                <h2>Offer Tracking: {offer_data.title} -Offer</h2>
              </div>
              <Collapse
                // defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {/* Tracking Panel */}
                <Panel header="Tracking Domain" key="7">
                  <Form layout="horizontal">
                    {/* Custom Currency */}
                    <Form.Item label="Tracking Domain">
                      <Select
                        showSearch
                        value={tracking_domain}
                        style={{ width: 240 }}
                        onChange={handleTrackingDomain}
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {domain_list.map(item => (
                          <Option value={item.domain} key={item.domain}>
                            {item.domain}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          {offer_details.offer_value == 5 ? (
            <div>
              <div className="air__utils__heading">
                <h2>Offer Links: {offer_data.title} -Offer</h2>
              </div>
              <Collapse
                // defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel header="Links" key="7">
                  <Form layout="horizontal">
                    <Form.Item label="Url:">
                      <Input
                        value={url}
                        onChange={e => {
                          setURL(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Preview Url:">
                      <Input
                        value={preview_url}
                        onChange={e => {
                          setPreviewURL(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Android Url:">
                      <Input
                        value={android_url}
                        onChange={e => {
                          setAndroidURL(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Ios Url:">
                      <Input
                        value={ios_url}
                        onChange={e => {
                          setIOSURL(e.target.value);
                        }}
                      />
                    </Form.Item>

                    <Form layout="inline">
                      <Form.Item>
                        {urls.map((field, idx) => {
                          return (
                            <Form layout="vertical" key={`${field}-${idx}`}>
                              <Form.Item>
                                <Input
                                  style={{ width: 180 }}
                                  placeholder="Enter Url"
                                  value={urls[idx].value}
                                  onChange={e => handleChangeUrl(idx, e)}
                                />

                                <Button
                                  style={{ width: 180 }}
                                  type="link"
                                  onClick={() => handleRemoveUrl(idx)}
                                >
                                  X
                                </Button>
                              </Form.Item>
                            </Form>
                          );
                        })}
                      </Form.Item>

                      <Form.Item>
                        {offer_rotation.map((field, idx) => {
                          // console.log("offer_rotation", field);
                          return (
                            <Form layout="vertical" key={`${field}-${idx}`}>
                              <Form.Item>
                                <Input
                                  style={{ width: 180 }}
                                  placeholder="Enter Offer Rotation"
                                  value={offer_rotation[idx].value}
                                  onChange={e => handleChangeOffer(idx, e)}
                                />
                                <Button
                                  style={{ width: 180 }}
                                  type="link"
                                  onClick={() => handleRemoveRotation(idx)}
                                >
                                  X
                                </Button>
                              </Form.Item>
                            </Form>
                          );
                        })}
                      </Form.Item>
                    </Form>

                    <Form layout="inline">
                      <Form.Item style={{ width: 360 }}>
                        <Button type="link" onClick={() => handleAddUrl()}>
                          +Add Url
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button type="link" onClick={() => handleAddRotation()}>
                          +Add Offer_Rotation
                        </Button>
                      </Form.Item>
                    </Form>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          <Form.Item></Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                saveForm();
              }}
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default EditOffer;
