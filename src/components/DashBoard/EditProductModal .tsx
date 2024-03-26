import React from "react";
import { Input, Modal, Form, Space, Select, message } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditProductModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  data: any;
}> = ({ open, onCancel, data }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (productId: any) => {
    try {
      let values = form.getFieldsValue();

      const response = await fetch(
        `http://localhost:3000/api/v1/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );


      if (response.ok) {
        onCancel();
        message.success("Product edited");
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error: any) {
      message.error("Check the entered values");
    }
  };

  return (
    <Modal
      title={"Edit product"}
      open={open}
      onCancel={onCancel}
      onOk={()=>handleSubmit(data._id)}
      okText="Submit"
      cancelText="Cancel"
    >
      <br />
      <Form
        form={form} 
        {...formItemLayout}
        initialValues={data}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter product name" },
            {
              type: "string",
              min: 5,
              message: "Name must be at least 5 characters",
            },
          ]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
            {
              type: "string",
              min: 5,
              message: "Description must be at least 5 characters",
            },
          ]}
        >
          <Input placeholder="Product Description" />
        </Form.Item>
        <Form.Item label="Price">
          <Space.Compact>
            <Form.Item
              name={["price"]}
              noStyle
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input style={{ width: "50%" }} placeholder="Price" />
            </Form.Item>
            <Form.Item
              name={["unit"]}
              noStyle
              rules={[{ required: true, message: "Province is required" }]}
            >
              <Select placeholder="Unit">
                <Option value="sqft">per sqFeet</Option>
                <Option value="m">per metre</Option>
                <Option value="sqcm">per sqCm</Option>
                <Option value="cm">per cm</Option>
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter current stock" }]}
        >
          <Input placeholder="Stock (nos)" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please enter product category" }]}
        >
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter product brand" }]}
        >
          <Input placeholder="Brand" />
        </Form.Item>
        <Form.Item
          name="material"
          label="Material"
          rules={[{ required: true, message: "Please enter product material" }]}
        >
          <Input placeholder="Material" />
        </Form.Item>
        <Form.Item
          name="dimensions"
          label="Dimension"
          rules={[
            { required: true, message: "Please enter product Dimension" },
          ]}
        >
          <Input placeholder="Product Dimensions" />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          rules={[{ required: true, message: "Please enter product Color" }]}
        >
          <Input placeholder="Product Colors" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
