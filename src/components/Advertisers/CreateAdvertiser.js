import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input } from 'antd'

const CreateAdvertiser = () => {
  const [fname, setFName] = useState()
  const [lname, setLName] = useState()
  const [email, setEmail] = useState()
  const handleSubmit = e => {
    e.preventDefault()
    console.log('Name', fname, lname, email)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }
  return (
    <div>
      <Helmet title="Create Publishers" />
      <Form {...formItemLayout} labelAlign="left">
        <Form.Item label="Firstname">
          <Input
            placeholder="Your FirstName..."
            onChange={e => {
              setFName(e.target.value)
            }}
          />
        </Form.Item>
        <Form.Item label="Lastname">
          <Input
            placeholder="Your Lastname..."
            onChange={e => {
              setLName(e.target.value)
            }}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            placeholder="Your Email..."
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
        </Form.Item>

        <button
          type="submit"
          onClick={e => {
            handleSubmit(e)
          }}
          className="btn btn-success px-5"
        >
          Create Advertiser
        </button>
      </Form>
    </div>
  )
}

export default CreateAdvertiser
