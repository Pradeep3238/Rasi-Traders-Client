import React, { useState } from "react";
import { Input, Modal, message, Form, GetProp, Space, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const AddProductModal: React.FC<{ open: boolean; onCancel: () => void }> = ({
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = async () => {
    try {
      let values = await form.validateFields();
      values = {
        ...values,
        images: fileList.map((image) => image.originFileObj),
      };
      console.log(values.images);
      const formData = new FormData();

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj as Blob);
        }
      });

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("unit", values.unit);
      formData.append("quantity", values.quantity);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("material", values.material);
      formData.append("dimensions", values.dimensions);
      formData.append("color", values.color);

      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        message.success("Product Created");
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error: any) {
      message.error("Check the entered values");
    }
  };

  return (
    <Modal
      title={"Add product"}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Submit"
      cancelText="Cancel"
    >
      <br />
      <Form
        form={form} // Pass the form instance to the Form component
        {...formItemLayout}
        initialValues={{ images: fileList }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="images"
          label="Product Images"
          valuePropName="fileList"
          getValueFromEvent={(e) => normFile(e)}
          rules={[{ required: true, message: "Please upload product image " }]}
        >
          <ImgCrop rotationSlider>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              onPreview={onPreview}
            >
              {fileList.length < 3 && (
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>
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

export default AddProductModal;
