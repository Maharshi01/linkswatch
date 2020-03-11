import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Collapse,
  Select,
  DatePicker
} from "antd";
import axios from "axios";
import { CountryCodes } from "../CountryCodes";
import { TimeZone } from "../../../TimeZone";

const CreateOffer = () => {
  let history = useHistory();
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TextArea } = Input;
  const [urls, setOfferUrl] = useState([{ value: "" }]);
  const [offer_rotation, setOfferRotation] = useState([{ value: "" }]);
  const [first, setA] = useState([]);
  const [second, setB] = useState([]);
  const [advertisers_list, setAdvertisersList] = useState([]);
  const [advertiser_id, setAdvertiser] = useState("");
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [channel, setChannel] = useState("");
  const [operating_system, setOS] = useState("");
  const [incentive, setIncentive] = useState("");
  const [vertical, setVertical] = useState("");
  const [conversion_type, setConversionType] = useState("");
  const [media_placement, setMediaPlacement] = useState("");
  const [description_text, setDescription] = useState("");
  const [conversion_tracking, setConversionTrack] = useState(
    "server-postback-w/-transaction-ID"
  );
  const [expiration_date, setDate] = useState("");
  const [category_list, setCategoryList] = useState([]);
  const [offer_category, setCategory] = useState("");
  const [groups_list, setGroupsList] = useState([]);
  const [group_id, setGroup] = useState("");
  const [reference_id, setReferenceID] = useState("");
  const [revenue_type, setRevenueType] = useState("RPA");
  const [revenue_per_conversion, setRevenue] = useState("");
  const [payout_type, setPayoutType] = useState("CPA");
  const [cost_per_conversion, setPayoutCost] = useState("");
  const [preview_url, setPreviewURL] = useState("");
  const [android_url, setAndroidURL] = useState("");
  const [ios_url, setIOSURL] = useState("");
  const [daily_cap, setDailyCap] = useState("");
  const [customcurrency, setCustomCurrency] = useState("disabled");
  const [currency, setCountry] = useState("United States dollar");
  const [country_code, setCountryCode] = useState("");
  const [timezones, setTimeZones] = useState([]);
  const [time_zone, setTimeZone] = useState("");

  const [private_id, setPrivate] = useState("0");
  const [caps, setCaps] = useState("0");
  const [email_instructions, setEmailInstructions] = useState("0");
  const [suppression_list_status, setSuppression] = useState("0");

  const [daily_conversions, setDailyConversions] = useState("");
  const [monthly_conversions, setMonthlyConversions] = useState("");
  const [lifetime_conversions, setLifetimeConversions] = useState("");
  const [daily_payout, setDailyPayout] = useState("");
  const [monthly_payout, setMonthlyPayout] = useState("");
  const [lifetime_payout, setLifetimePayout] = useState("");
  const [daily_revenue, setDailyRevenue] = useState("");
  const [monthly_revenue, setMonthlyRevenue] = useState("");
  const [lifetime_revenue, setLifetimeRevenue] = useState("");

  const [approved_from_lines, setApprovedFromLines] = useState("");
  const [approved_subject_lines, setApprovedSubjectLines] = useState("");

  const [suppression_list, setSuppressionList] = useState([]);
  const [suppression_name, setSuppressionName] = useState("");

  const [domain_list, setDomainList] = useState([]);
  const [tracking_domain, setTrackingDomain] = useState("");

  const [symbol, setSymbol] = useState("US$");

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

  function onSearch(val) {
    console.log("search:", val);
  }

  function onSelect(key) {
    console.log("Select:", key);
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
    // let b = [...second];
    // b.push(values[i].value);
    // setB(b);
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
  useEffect(() => {
    // setTimeZones(moment.tz.names());
    // console.log("Timezones", moment.tz.names());

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
      url: "https://api.linkswatch.io/Offersapi/offers_suppression_list",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config3)
      .then(response => {
        console.log("Got Suppression List", response.data.data);
        setSuppressionList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Suppression List", error);
      });

    const config4 = {
      url: "https://api.linkswatch.io/Adminapi/trackingGetDomains",
      method: "get",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config4)
      .then(response => {
        console.log("Got  Domain List", response.data.data);
        setDomainList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Domains List", error);
      });
  }, []);
  const customPanelStyle = {
    background: "#ffffff",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
  };
  function handleAdvertiser(value) {
    console.log(`selected ${value}`);
    setAdvertiser(value);
  }
  const handletitle = title => {
    setTitle(title);
  };
  const handleUrl = url => {
    setURL(url);
  };
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
  const handlePreviewURL = url => {
    setPreviewURL(url);
  };
  const handleAndroidURL = url => {
    setAndroidURL(url);
  };
  const handleIosURL = url => {
    setIOSURL(url);
  };
  // const handleURL_1 = url => {
  //   setURL_1(url);
  // };
  // const handleURL_2 = url => {
  //   setURL_2(url);
  // };
  // const handleURL_3 = url => {
  //   setURL_3(url);
  // };
  // const handleURL_4 = url => {
  //   setURL_4(url);
  // };
  // const handleOfferURL_1 = url => {
  //   setOfferURL_1(url);
  // };
  // const handleOfferURL_2 = url => {
  //   setOfferURL_2(url);
  // };
  // const handleOfferURL_3 = url => {
  //   setOfferURL_3(url);
  // };
  // const handleOfferURL_4 = url => {
  //   setOfferURL_4(url);
  // };
  // const handleDailyCap = cap => {
  //   setDailyCap(cap);
  // };

  function handleCustomCurrency(value) {
    console.log(`selected ${value}`);
    setCustomCurrency(value);
  }
  function handleTrackingDomain(value) {
    console.log(`selected ${value}`);
    setTrackingDomain(value);
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
  function handleCountryCode(value) {
    console.log(`selected ${value}`);
    setCountryCode(value);
  }
  function handleTimeZone(value) {
    console.log(`selected ${value}`);
    setTimeZone(value);
  }
  const submitform = () => {
    const bodyFormData = new FormData();

    for (let i = 0; i < urls.length; i++) {
      first.push(urls[i].value);
    }
    for (let i = 0; i < offer_rotation.length; i++) {
      second.push(offer_rotation[i].value);
    }
    console.log("first,second", first, second);
    bodyFormData.append("title", title);
    bodyFormData.append("url", url);
    bodyFormData.append("country_code", country_code);
    bodyFormData.append("offer_category", offer_category);
    bodyFormData.append("group_id", group_id);
    bodyFormData.append("advertiser_id", advertiser_id);
    bodyFormData.append("channel", channel);
    bodyFormData.append("operating_system", operating_system);
    bodyFormData.append("incentive", incentive);
    bodyFormData.append("vertical", vertical);
    bodyFormData.append("conversion_type", conversion_type);
    bodyFormData.append("media_placement", media_placement);
    bodyFormData.append("currency", currency);
    bodyFormData.append("daily_cap", daily_cap);
    bodyFormData.append("time_zone", time_zone);
    bodyFormData.append("description_text", description_text);
    bodyFormData.append("revenue_type", revenue_type);
    bodyFormData.append("revenue_per_conversion", revenue_per_conversion);
    bodyFormData.append("payout_type", payout_type);
    bodyFormData.append("cost_per_conversion", cost_per_conversion);
    bodyFormData.append("expiration_date", expiration_date);
    bodyFormData.append("reference_id", reference_id);
    bodyFormData.append("preview_url", preview_url);
    bodyFormData.append("android_url", android_url);
    bodyFormData.append("ios_url", ios_url);
    bodyFormData.append("other_url", first);
    bodyFormData.append("offer_rotation_url", second);
    bodyFormData.append("conversion_tracking", conversion_tracking);

    bodyFormData.append("private", private_id);
    bodyFormData.append("caps", caps);
    bodyFormData.append("email_instructions", email_instructions);
    bodyFormData.append("suppression_list_status", suppression_list_status);

    bodyFormData.append("daily_conversions", daily_conversions);
    bodyFormData.append("monthly_conversions", monthly_conversions);
    bodyFormData.append("lifetime_conversions", lifetime_conversions);
    bodyFormData.append("daily_payout", daily_payout);
    bodyFormData.append("monthly_payout", monthly_payout);
    bodyFormData.append("lifetime_payout", lifetime_payout);
    bodyFormData.append("daily_revenue", daily_revenue);
    bodyFormData.append("monthly_revenue", monthly_revenue);
    bodyFormData.append("lifetime_revenue", lifetime_revenue);

    bodyFormData.append("approved_from_lines", approved_from_lines);
    bodyFormData.append("approved_subject_lines", approved_subject_lines);

    bodyFormData.append("suppression_name", suppression_name);

    bodyFormData.append("tracking_domain", tracking_domain);

    const createoffer = {
      url: "https://api.linkswatch.io/Offersapi/offers",
      data: bodyFormData,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };

    axios(createoffer)
      .then(response => {
        console.log("Create Offer Response", response);
        history.push("/offers_list");
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };
  return (
    <div>
      <Helmet title="Offer -CreateOffer" />
      <div className="air__utils__heading">
        <h2>Create Offer</h2>
      </div>
      <div>
        <Collapse
          // defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <Icon type="caret-right" rotate={isActive ? 90 : 0} />
          )}
        >
          {/* Details Panel */}
          <Panel header="Details" key="1">
            <Form layout="horizontal">
              {/* Advertisers */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Advertiser" style={{ width: 360 }}>
                <Select
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
              {/* </Form> */}
              {/* Title */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Title" style={{ width: 360 }}>
                <Input
                  value={title}
                  onChange={e => {
                    handletitle(e.target.value);
                  }}
                  placeholder="Enter Title"
                />
              </Form.Item>
              {/* </Form> */}
              {/* Url */}
              {/* <Form layout="inline"> */}

              {/* </Form> */}
              {/* Channel & Operating System */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Channel">
                <Select
                  defaultValue=""
                  style={{ width: 240 }}
                  onChange={handleChannel}
                >
                  <Option value="desktop/web">Desktop/Web</Option>
                  <Option value="mobile">Mobile</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Operating System">
                <Select
                  defaultValue=""
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
              {/* </Form> */}
              {/* Incentive,Vertical & Conversion Type */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Incentive">
                <Select
                  defaultValue=""
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
                  defaultValue=""
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
                  defaultValue=""
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
              {/* </Form> */}
              {/* Media Placement */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Media Placement">
                <Select
                  defaultValue=""
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
              {/* </Form> */}
              {/* Description */}
              {/* <Form layout="inline"> */}
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
              {/* </Form> */}
              {/* Conversion Tracking */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Conversion Tracking">
                <Select
                  defaultValue="server-postback-w/-transaction-ID"
                  style={{ width: 240 }}
                  onChange={handleTracking}
                >
                  <Option value="server-postback-w/-transaction-ID">
                    Server Postback w/ Transaction ID
                  </Option>
                  <Option value="server-postback-w/-partner-ID">
                    Server Postback w/ Partner ID
                  </Option>
                  <Option value="https-image-pixel">HTTPS Image Pixel</Option>
                  <Option value="https-iframe-pixel">HTTPS iFrame Pixel</Option>
                  <Option value="http-image-pixel">HTTP Image Pixel</Option>
                  <Option value="http-iframe-pixel">HTTP iFrame Pixel</Option>
                </Select>
              </Form.Item>
              {/* </Form> */}
              {/* Expiration Date */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Expiration Date" style={{ width: 360 }}>
                <DatePicker onChange={handleDate} />
              </Form.Item>
              {/* </Form> */}
              {/* Categories and Groups */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Categories" style={{ width: 360 }}>
                <Select
                  showSearch
                  defaultValue=""
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
                    <Option value={item.off_cat_id} key={item.off_cat_id}>
                      {item.category_title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Groups" style={{ width: 360 }}>
                <Select
                  showSearch
                  defaultValue=""
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
                    <Option value={item.grp_id} key={item.grp_id}>
                      {item.group_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* </Form> */}
              {/* Reference ID */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Reference ID" style={{ width: 360 }}>
                <Input
                  value={reference_id}
                  onChange={e => {
                    handleReferenceID(e.target.value);
                  }}
                  placeholder="Enter Reference ID"
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
              {/* </Form> */}
            </Form>
          </Panel>

          {/* Currency Panel */}
          <Panel header="Currency" key="2">
            <Form layout="horizontal">
              {/* Custom Currency */}
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
          </Panel>

          {/* Link Panel */}
          <Panel header="Link" key="3">
            <Form layout="horizontal">
              {/* Preview URl */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Url" style={{ width: 360 }}>
                <Input
                  value={url}
                  onChange={e => {
                    handleUrl(e.target.value);
                  }}
                  placeholder="Enter Url"
                />
              </Form.Item>
              <Form.Item label="Preview Url" style={{ width: 360 }}>
                <Input
                  value={preview_url}
                  onChange={e => {
                    handlePreviewURL(e.target.value);
                  }}
                  placeholder="Enter Preview URL"
                />
              </Form.Item>
              {/* </Form> */}
              {/* Android URl */}
              {/* <Form layout="inline"> */}
              <Form.Item label="Android Url" style={{ width: 360 }}>
                <Input
                  value={android_url}
                  onChange={e => {
                    handleAndroidURL(e.target.value);
                  }}
                  placeholder="Enter Android URL"
                />
              </Form.Item>
              {/* </Form> */}
              {/* Ios URl */}
              {/* <Form layout="inline"> */}
              <Form.Item label="IOS Url" style={{ width: 360 }}>
                <Input
                  value={ios_url}
                  onChange={e => {
                    handleIosURL(e.target.value);
                  }}
                  placeholder="Enter Android URL"
                />
              </Form.Item>
              {/* </Form> */}
              {/* Url's 1-4 */}
              <Form layout="inline">
                <Form.Item>
                  {urls.map((field, idx) => {
                    return (
                      <Form layout="vertical" key={`${field}-${idx}`}>
                        {/* {console.log("idx field", idx, field)}   */}
                        <Form.Item>
                          <Input
                            style={{ width: 180 }}
                            placeholder="Enter Url "
                            // value={field}
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
                            // value={field}
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
                {/* </Form> */}
                {/* <Form layout="inline"> */}
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
              {/* </Form> */}

              {/* 
              <Form layout="inline">
                <Form.Item label="Url-2" style={{ width: 360 }}>
                  <Input
                    value={url_2}
                    onChange={e => {
                      handleURL_2(e.target.value);
                    }}
                    placeholder="Enter Url-2"
                  />
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Url-3" style={{ width: 360 }}>
                  <Input
                    value={url_3}
                    onChange={e => {
                      handleURL_3(e.target.value);
                    }}
                    placeholder="Enter Url-3"
                  />
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Url-4" style={{ width: 360 }}>
                  <Input
                    value={url_4}
                    onChange={e => {
                      handleURL_4(e.target.value);
                    }}
                    placeholder="Enter Url-4"
                  />
                </Form.Item>
              </Form>
              Offer Rotations Url's 1-4
           
              <Form layout="inline">
                <Form.Item label="Offer Rotation Url-2" style={{ width: 360 }}>
                  <Input
                    value={offer_rotation_url_2}
                    onChange={e => {
                      handleOfferURL_2(e.target.value);
                    }}
                    placeholder="Enter Offer Rotation URL-2"
                  />
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Offer Rotation Url-3" style={{ width: 360 }}>
                  <Input
                    value={offer_rotation_url_3}
                    onChange={e => {
                      handleOfferURL_3(e.target.value);
                    }}
                    placeholder="Enter Offer Rotation URL-3"
                  />
                </Form.Item>
              </Form>
              <Form layout="inline">
                <Form.Item label="Offer Rotation Url-4" style={{ width: 360 }}>
                  <Input
                    value={offer_rotation_url_4}
                    onChange={e => {
                      handleOfferURL_4(e.target.value);
                    }}
                    placeholder="Enter Offer Rotation URL-4"
                  />
                </Form.Item>
              </Form>
             */}
            </Form>
          </Panel>

          {/* Revenue Panel */}
          <Panel header="Revenue" key="4">
            <Form layout="horizontal">
              {/* Revenue Type */}
              <Form.Item label="Revenue Type">
                <Select
                  defaultValue="RPA"
                  style={{ width: 480 }}
                  onChange={handleRevenueType}
                >
                  <Option value="RPA">Revenue Per Conversion(RPA)</Option>
                  <Option value="RPS">Revenue per Sale(RPS)</Option>
                  <Option value="RPA+RPS">
                    Revenue per Conversion plus Revenue per Sale (RPA + RPS)
                  </Option>
                  <Option value="RPC">Revenue per Click(RPC)</Option>
                  <Option value="RPM">
                    Revenue per Thousand Impressions(RPM)
                  </Option>
                </Select>
              </Form.Item>
              {/* Revenue Per Conversion */}
              <Form.Item label="Revenue Per Conversion" style={{ width: 360 }}>
                <Input
                  addonBefore={symbol}
                  // value={revenue_per_conversion}
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

          {/* Payout Panel */}
          <Panel header="Payout" key="5">
            <Form layout="horizontal">
              {/* Revenue Type */}
              <Form.Item label="Payout Type">
                <Select
                  defaultValue="CPA"
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
              {/* Revenue Per Conversion */}
              <Form.Item label="Cost Per Conversion" style={{ width: 360 }}>
                <Input
                  addonBefore={symbol}
                  // value={cost_per_conversion}
                  onChange={e => {
                    handlePayout(e.target.value);
                  }}
                  // placeholder="Enter Cost Per Conversion"
                />
              </Form.Item>
            </Form>
          </Panel>

          {/* Settings Panel */}
          <Panel header="Settings" key="6">
            <Form layout="horizontal">
              {/* Daily Conversions */}
              <Form.Item label="Private">
                <Select
                  defaultValue="0"
                  style={{ width: 360 }}
                  onChange={handlePrivate}
                >
                  <Option value="0">Disabled</Option>
                  <Option value="1">Enabled</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Caps">
                <Select
                  defaultValue="0"
                  style={{ width: 360 }}
                  onChange={handleCaps}
                >
                  <Option value="0">Disabled</Option>
                  <Option value="1">Enabled</Option>
                </Select>
              </Form.Item>
              {caps == 1 ? (
                <Form layout="vertical">
                  <Form.Item label=" Daily Conversions:" style={{ width: 240 }}>
                    <Input
                      // value={title}
                      onChange={e => {
                        setDailyConversions(e.target.value);
                      }}
                      placeholder="Daily Conversions"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Monthly Conversions:"
                    style={{ width: 240 }}
                  >
                    <Input
                      // value={title}
                      onChange={e => {
                        setMonthlyConversions(e.target.value);
                      }}
                      placeholder="Monthly Conversions"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lifetime Conversions:"
                    style={{ width: 240 }}
                  >
                    {" "}
                    <Input
                      // value={title}
                      onChange={e => {
                        setLifetimeConversions(e.target.value);
                      }}
                      placeholder="Lifetime Conversions"
                    />
                  </Form.Item>
                  <Form.Item label="Daily Payout:" style={{ width: 240 }}>
                    {" "}
                    <Input
                      // value={title}
                      onChange={e => {
                        setDailyPayout(e.target.value);
                      }}
                      placeholder="Daily Payout"
                    />
                  </Form.Item>
                  <Form.Item label="Monthly Payout:" style={{ width: 240 }}>
                    {" "}
                    <Input
                      // value={title}
                      onChange={e => {
                        setMonthlyPayout(e.target.value);
                      }}
                      placeholder="Monthly Payout"
                    />
                  </Form.Item>
                  <Form.Item label="Lifetime Payout:" style={{ width: 240 }}>
                    <Input
                      // value={title}
                      onChange={e => {
                        setLifetimePayout(e.target.value);
                      }}
                      placeholder="Lifetime Payout"
                    />
                  </Form.Item>
                  <Form.Item label="Daily Revenue:" style={{ width: 240 }}>
                    <Input
                      // value={title}
                      onChange={e => {
                        setDailyRevenue(e.target.value);
                      }}
                      placeholder="Daily Revenue"
                    />
                  </Form.Item>
                  <Form.Item label="Monthly Revenue:" style={{ width: 240 }}>
                    {" "}
                    <Input
                      // value={title}
                      onChange={e => {
                        setMonthlyRevenue(e.target.value);
                      }}
                      placeholder="Monthly Revenue"
                    />
                  </Form.Item>
                  <Form.Item label="Lifetime Revenue:" style={{ width: 240 }}>
                    <Input
                      // value={title}
                      onChange={e => {
                        setLifetimeRevenue(e.target.value);
                      }}
                      placeholder="Lifetime Revenue"
                    />
                  </Form.Item>
                </Form>
              ) : (
                ""
              )}
              <Form.Item label="Email Instructions">
                <Select
                  defaultValue="0"
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
                      // value={description_text}
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
                      // value={description_text}
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
                    defaultValue="0"
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
                      {/* <Form.Item label="Categories" style={{ width: 360 }}> */}
                      <Select
                        showSearch
                        defaultValue=""
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
                          <Option value={item.sup_list_id}>{item.name}</Option>
                        ))}
                      </Select>
                      {/* </Form.Item> */}
                    </Form>
                  ) : (
                    ""
                  )}
                </Form.Item>
              </Form>

              {/* <Form.Item label="Daily Conversions" style={{ width: 360 }}>
                <Input
                  value={daily_cap}
                  onChange={e => {
                    handleDailyCap(e.target.value);
                  }}
                  placeholder="Enter Daily Conversions"
                />
              </Form.Item> */}
              {/* Country Codes */}
              <Form.Item label="Country Codes">
                <Select
                  showSearch
                  showArrow
                  defaultValue=""
                  style={{ width: 240 }}
                  onChange={handleCountryCode}
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {CountryCodes.map(item => (
                    <Option value={item.name} key={item.cc}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Time Zones">
                <Select
                  showSearch
                  showArrow
                  defaultValue=""
                  style={{ width: 360 }}
                  onChange={handleTimeZone}
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {TimeZone.map(item => (
                    <Option value={item.timezone} key={item.timezone}>
                      {item.timezone}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Panel>

          {/* Tracking Panel */}
          <Panel header="Tracking" key="7">
            <Form layout="horizontal">
              {/* Custom Currency */}
              <Form.Item label="Tracking Domain">
                <Select
                  showSearch
                  defaultValue=""
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
      <Form.Item>
        <Form.Item></Form.Item>
        <Button
          type="primary"
          onClick={() => {
            submitform();
          }}
        >
          Create
        </Button>
      </Form.Item>
    </div>
  );
};
export default CreateOffer;
