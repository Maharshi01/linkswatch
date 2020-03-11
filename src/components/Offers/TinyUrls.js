import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Input, Tooltip, Icon, Button } from "antd";
import { axios } from "axios";

const TinyUrl = () => {
  return (
    <div>
      <Helmet title="Tiny Urls" />
      <div className="air__utils__heading">
        <h2>Tiny Urls</h2>
      </div>
    </div>
  );
};

export default TinyUrl;
