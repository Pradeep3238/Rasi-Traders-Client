import React from "react";
import { Button, Typography, Form, Input, message } from "antd";

const { Paragraph } = Typography;

type FieldType = {
  email?: string;
  feedback?: string;
};

const onFinish = async (values: FieldType) => {
  try{const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(values)
  })

  const resData = await response.json();
  if(resData.status === 'success'){
   message.success(resData.message);
  }
  }catch(err:any){
    message.error(err);
  }
};

const App: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Form
      name="basic"
      labelCol={{ span: 4}}
      initialValues={{ remember: true }}
      style={{ width: 700, marginTop: 50 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Feedback"
        name="feedback"
        rules={[{ required: true, message: "Please input your feedback!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 11, span: 25 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <Paragraph style={{ marginTop: 20,margin:'auto', textAlign: "center", fontStretch: "extra-expanded" }}>
      Designed By Pradeep ● 2024
    </Paragraph>
  </div>
);

export default App;
