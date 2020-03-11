import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Input, Divider, Table, Button, DatePicker, Select } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { CountryCodes } from "../CountryCodes";

const OfferList = () => {
  const { Search } = Input;
  const { Option } = Select;
  const [offers_list, setOffersList] = useState();
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [offer_status, setStatus] = useState("");

  const formdata = new FormData();

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
        setOffersList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers List", error);
      });
  }, []);

  // const handleSubmit = () => {
  //   // e.preventDefault()
  //   console.log("Name", fname, lname, email);
  //   const postdata = {
  //     title: "Testing",
  //     url: "www.offfers.com",
  //     country_code: "IN",
  //     group_id: "1",
  //     publisher_id: "1",
  //     payout: "IN",
  //     payout_currency: "IN",
  //     daily_cap: "20",
  //     time_zone: "IB",
  //     alternative_offer_id: "IN",
  //     priority_code: "YES"
  //   };
  //   Object.keys(postdata).forEach(key => {
  //     formdata.append(key, postdata[key]);
  //   });
  //   const config = {
  //     url: "https://api.linkswatch.io/Offersapi/offers",
  //     data: formdata,
  //     method: "post",
  //     headers: {
  //       Authorization:
  //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
  //     }
  //   };
  //   axios(config)
  //     .then(response => {
  //       console.log("Response", response);
  //     })
  //     .catch(err => {
  //       console.log("Error", err);
  //     });
  // };
  // const handleTitle = value => {
  //   // console.log("title in handle title", value);
  //   // setTitle(value);
  //   ApplyFilter();
  // };
  // const handleId = value => {
  //   setId(value);
  //   ApplyFilter(offer_status);
  // };
  function handleStartDate(date, dateString) {
    console.log("date", date, dateString);
    setStartDate(dateString);
  }
  function handleEndDate(date, dateString) {
    console.log("date", date, dateString);
    setEndDate(dateString);
  }

  const view_offer = record => {
    localStorage.setItem("record", JSON.stringify(record));
  };
  // const handleStatus = value => {
  //   console.log(`selected ${value}`);
  //   let statusvalue;
  //   if (value == "active") {
  //     statusvalue = 1;
  //   } else if (value == "inactive") {
  //     statusvalue = 0;
  //   } else {
  //     statusvalue = 2;
  //   }
  //   console.log("statusvalue", statusvalue);
  //   setStatus(statusvalue);
  //   ApplyFilter();
  // };

  const ApplyFilter = statusvalue => {
    console.log("title", title);
    console.log("Id", id);
    console.log("offer_status", statusvalue);
    console.log("start_date", start_date);
    console.log("end_date", end_date);
    formdata.append("id", id);
    formdata.append("title", title);
    formdata.append("offer_status", statusvalue);
    formdata.append("start_date", start_date);
    formdata.append("end_date", end_date);
    const config = {
      url: "https://api.linkswatch.io/Offersapi/offers_filter",
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
          setOffersList(response.data.data);
          console.log("Response", response);
          // setTitle("");
          // setId("");
          // setStartDate("");
          // setEndDate("");
          // setStatus("");
          // history.push("/offer_groups");
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error", error);
      });
  };
  function rerender() {
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
        setOffersList(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers List", error);
      });
  }
  const DeleteRecord = record => {
    console.log("jhcdc", record);
    const config = {
      url: `https://api.linkswatch.io/Offersapi/offers/${record.off_id}`,
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
        alert(error);
        console.log("Error While Deleting Record", error);
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "off_id",
      width: 50
    },
    {
      title: "Offer",
      dataIndex: "title",
      width: 150,
      render: (text, record) => (
        <Link
          onClick={() => {
            view_offer(record);
          }}
          to={`/offers/view/${record.off_id}`}
        >
          {record.title}
        </Link>
      )
    },

    {
      title: "Status",
      dataIndex: "offer_status",
      key: "offer_status",
      width: 100,
      render: (text, record) => (
        <span>
          <a>{record.offer_status == 1 ? "Active" : "InActive"}</a>
        </span>
      )
    },

    {
      title: "Advertiser",
      dataIndex: "company"
      // render: (text, record) => (
      //   <div>
      //     {/* <Button type="link">View</Button> */}
      //     {/* <Button type="link">Clone</Button> */}
      //     {/* <Button type="link" onClick={() => DeleteRecord(record)}>
      //       Delete
      //     </Button> */}
      //     <p>{record.channel + " " + record.operating_system}</p>
      //   </div>
      // )
      // // width: 220
    },
    {
      title: "Category",
      dataIndex: "category_title"
      // width: 220
    },

    {
      title: "Payout",
      // dataIndex: "cost_per_conversion",

      render: record => (
        <span>
          {CountryCodes.map(item => {
            let symbol = "";
            if (record.currency == item.name) {
              symbol = item.symbol;
              return (
                <p>
                  {symbol +
                    " " +
                    record.cost_per_conversion +
                    " " +
                    record.payout_type}
                </p>
              );
            }
            // } else {
            //   return (
            //     <p>{record.cost_per_conversion + " " + record.payout_type}</p>
            //   );
            // }
          })}
        </span>
      )
    },
    {
      title: "Revenue",
      // dataIndex: "revenue_per_conversion"
      render: (text, record) => (
        <span>
          {CountryCodes.map(item => {
            let symbol = "";
            if (record.currency == item.name) {
              symbol = item.symbol;
              return (
                <p>
                  {symbol +
                    "  " +
                    record.revenue_per_conversion +
                    "  " +
                    record.revenue_type}
                </p>
              );
            }
          })}
        </span>
      )
    },

    {
      title: "Clicks",
      dataIndex: "clicks"
    },
    {
      title: "Conversions",
      dataIndex: "conversion"
    },
    {
      title: "Total Cost",
      // dataIndex: "total_cost"
      // width: 50

      render: (text, record) => (
        <span>
          {CountryCodes.map(item => {
            let symbol = "";
            if (record.currency == item.name) {
              symbol = item.symbol;
              return <p>{record.total_cost + " " + symbol}</p>;
            }
          })}
        </span>
      )
    },
    {
      title: "Total Revenue",
      // dataIndex: "total_revenue"

      render: (text, record) => (
        <span>
          {CountryCodes.map(item => {
            let symbol = "";
            if (record.currency == item.name) {
              symbol = item.symbol;
              return <p>{record.total_revenue + " " + symbol}</p>;
            }
          })}
        </span>
      )
      // width: 50
    },
    {
      title: "Action",
      key: "action",
      // fixed: "right",
      // width: 160,
      render: (text, record) => (
        <div>
          <Link
            to={`/offers/view/${record.off_id}`}
            onClick={() => {
              view_offer(record);
            }}
          >
            <Button type="link">View</Button>
          </Link>
          {/* <Button type="link">Clone</Button> */}
          <Button type="link" onClick={() => DeleteRecord(record)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Helmet title="Create Publishers" />
      <div
        className="air__utils__heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h2>Offers</h2>
        {/* </div> */}
        {/* <div style={{ display: "flex", justifyContent: "right" }}> */}
        <Link to={`/offers/add`}>
          <Button type="primary">Create Offer</Button>
        </Link>
      </div>
      <div>
        <Form layout="inline">
          {/* <Form.Item label="Filters"></Form.Item> */}
          <Select
            defaultValue="Select Status.."
            style={{ width: 240 }}
            onChange={value => {
              console.log(`selected ${value}`);
              let statusvalue;
              if (value == "active") {
                statusvalue = 1;
              } else if (value == "inactive") {
                statusvalue = 0;
              } else {
                statusvalue = 2;
              }
              console.log("statusvalue", statusvalue);
              setStatus(statusvalue);
              ApplyFilter(statusvalue);
              // handleStatus(value)
            }}
            // onChange={value => setStatus(value)}
            // onSelect={() => ApplyFilter()}
          >
            {/* <Option value="">Select Status...</Option> */}
            <Option value="active">Active</Option>
            <Option value="inactive">InActive</Option>
            <Option value="deleted">Deleted</Option>
          </Select>
          <Form.Item></Form.Item>
          <Search
            placeholder="Search by Title"
            onChange={event => setTitle(event.target.value)}
            // onSearch={value => handleTitle(value)}
            onSearch={() => ApplyFilter(offer_status)}
            style={{ width: 200 }}
          />
          <Form.Item></Form.Item>

          <Search
            placeholder="Search by ID"
            onChange={event => setId(event.target.value)}
            onSearch={() => ApplyFilter(offer_status)}
            style={{ width: 200 }}
          />
          <Form.Item></Form.Item>

          <DatePicker
            placeholder={"Select Start Date"}
            onChange={handleStartDate}
          />
          <Form.Item></Form.Item>
          <DatePicker
            placeholder={"Select End Date"}
            onChange={handleEndDate}
          />
          <Form.Item></Form.Item>
          <Button type="primary" onClick={() => ApplyFilter(offer_status)}>
            Go
          </Button>
        </Form>
      </div>
      <Form.Item></Form.Item>
      <div>
        <Table
          // pageSize={5}
          rowKey={record => record.off_id}
          columns={columns}
          // pagination={{ pageSize: 5 }}
          dataSource={offers_list}
          bordered
          // scroll={{ x: 1500, y: 500 }}
        />
      </div>
    </div>
  );
};

export default OfferList;
