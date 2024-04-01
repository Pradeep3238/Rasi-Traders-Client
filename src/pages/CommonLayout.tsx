import React from "react";

import { Layout, theme } from "antd";


const {  Content } = Layout;

const CommonLayout: React.FC<{ children: any }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          padding: 24,
          marginBottom: 8,
          minHeight: 500,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default CommonLayout;
