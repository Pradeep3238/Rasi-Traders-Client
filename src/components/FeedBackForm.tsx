import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';

type FieldType = {
  email?: string;
  feedback?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 950 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item<FieldType>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="feedback"
      name="feedback"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 15, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;