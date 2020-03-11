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
import { Button, Table, Card, Form, Select, DatePicker } from "antd";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";

const OfferReports = () => {
  const { Option } = Select;
  const formdata = new FormData();
  var today = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Date
  var present_month = months[today.getMonth()]; //Current Month
  var previous_month = months[today.getMonth() - 1]; //Previous Month
  var year = new Date().getFullYear(); //Current Year
  var hour = new Date().getHours(); //Current Hour
  var min = new Date().getMinutes(); //Current Hour
  var sec = new Date().getSeconds(); //Current Hour

  var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  var sevenDaysAgo = moment().subtract(6, "day");

  var this_month = new Date(today.getFullYear(), today.getMonth(), 1);
  var last_month = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  var last_six_month = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  var all_time = new Date(today.getFullYear() - 50, today.getMonth() - 1, 1);

  const [reports_list, setReportsist] = useState([]);
  const [to_day, setToday] = useState(moment(today));
  const [yester_day, setYesterday] = useState(moment(today));

  const columns = [
    {
      title: "Advertiser",
      dataIndex: "company"
    },
    {
      title: "Offer ID",
      dataIndex: "off_id"
    },
    {
      title: "Offer",
      dataIndex: "title"
    },
    {
      title: "Clicks",
      dataIndex: "Clicks"
    },
    {
      title: "Conversions",
      dataIndex: "Conversions"
    },
    {
      title: "CR",
      dataIndex: "CR"
    },

    {
      title: "Payout",
      dataIndex: "Payout"
    },
    {
      title: "CPC",
      dataIndex: "CPC"
    },
    {
      title: "Revenue",
      dataIndex: "Revenue"
    },

    {
      title: "RPC",
      dataIndex: "RPC"
    },

    {
      title: "Profit",
      dataIndex: "Profit"
    }
  ];

  function handleDay(value) {
    console.log(`selected ${value}`);

    if (value == "today") {
      setToday(moment(today));
      setYesterday(moment(today));
    }
    if (value == "yesterday") {
      setToday(moment(yesterday));
      setYesterday(moment(yesterday));
    }
    if (value == "sevenDaysAgo") {
      setToday(moment(sevenDaysAgo));
      setYesterday(moment(today));
    }
    if (value == "this_month") {
      setToday(moment(this_month));
      setYesterday(moment(today));
    }
    if (value == "last_month") {
      setToday(moment(last_month));
      setYesterday(moment(today));
    }
    if (value == "last_six_month") {
      setToday(moment(last_six_month));
      setYesterday(moment(today));
    }
    if (value == "all_time") {
      setToday(moment(all_time));
      setYesterday(moment(today));
    }
  }

  function handleStartDate(date, dateString) {
    console.log("Start date", dateString);
    setToday(moment(date));
  }
  function handleEndDate(date, dateString) {
    console.log("End date", dateString);
    setYesterday(moment(date));
  }

  useEffect(() => {
    formdata.append("start_date", to_day.format("YYYY-MM-DD"));
    formdata.append("end_date", yester_day.format("YYYY-MM-DD"));
    const config = {
      url: " https://api.linkswatch.io/offersapi/offer_reports_filter",
      data: formdata,
      method: "post",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
      }
    };
    axios(config)
      .then(response => {
        console.log("Got Offer Reports List", response);
        setReportsist(response.data.data);
      })
      // Error handling
      .catch(error => {
        alert(error);
        console.log("Error While Getting Offers_Reports List", error);
      });
  }, []);

  // function reRender() {
  //   const config = {
  //     url: "https://api.linkswatch.io/Offersapi/offer_reports",
  //     method: "get",
  //     headers: {
  //       Authorization:
  //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluQGdtYWlsLmNvbSI.DiFEzLJeTF8RnMjddCCekZ4vuB4hvrx8IWKI_KyDLhY"
  //     }
  //   };
  //   axios(config)
  //     .then(response => {
  //       console.log("Got Offer Reports List", response);
  //       setReportsist(response.data.data);
  //     })
  //     // Error handling
  //     .catch(error => {
  //       alert(error);
  //       console.log("Error While Getting Offers_Reports List", error);
  //     });
  // }

  function runReport() {
    formdata.append("start_date", to_day.format("YYYY-MM-DD"));
    formdata.append("end_date", yester_day.format("YYYY-MM-DD"));
    console.log("formData", formdata);
    const config = {
      url: " https://api.linkswatch.io/offersapi/offer_reports_filter",
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
          console.log("Report Ran Successfully", response.data.data);
          setReportsist(response.data.data);
        }
      })
      .catch(error => {
        alert(error);
        console.log("Error While Running Report", error);
      });
  }

  // console.log("to_day", to_day.format("YYYY-MM-DD"));
  // console.log("yester_day", yester_day.format("YYYY-MM-DD"));

  return (
    <div>
      <Helmet title="Offer Reports" />

      <div className="air__utils__heading">
        <h2> Offer Reports</h2>
      </div>
      <Card title={<h5>Data Report</h5>} style={{ width: "100%" }}>
        <Form layout="inline">
          <Form.Item label="View Data For:">
            <Select
              defaultValue="Today"
              style={{ width: 240 }}
              onChange={handleDay}
            >
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="sevenDaysAgo">Last 7 Days</Option>
              <Option value="this_month">This Month - {present_month} </Option>
              <Option value="last_month">Last Month - {previous_month} </Option>
              <Option value="last_six_month">Last 6 Months</Option>
              <Option value="all_time">All Time</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Start and end Dates:">
            <DatePicker
              // format="YYYY-DD-MM"
              value={to_day}
              onChange={handleStartDate}
            />
          </Form.Item>
          <Form.Item>
            <DatePicker value={yester_day} onChange={handleEndDate} />
          </Form.Item>
        </Form>
      </Card>
      <Form.Item></Form.Item>
      <div
        className="air__utils__heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h2>Statistics</h2>
        <Button
          type="primary"
          onClick={() => {
            runReport();
          }}
        >
          Run Report
        </Button>
        <CSVLink
          filename={`OffersReport${date +
            "/" +
            month +
            "/" +
            year +
            "/" +
            hour +
            "/" +
            min +
            "/" +
            sec}.csv`}
          data={reports_list}
        >
          <Button type="primary">Export to CSV</Button>
        </CSVLink>
      </div>
      <Table columns={columns} dataSource={reports_list} bordered />
    </div>
  );
};

export default OfferReports;
