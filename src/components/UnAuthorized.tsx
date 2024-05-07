import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnAuthorized: React.FC<{subtitle : string}> = ({subtitle}) => {
  const navigate = useNavigate();
  const loginHandler= ()=>{
    navigate('/login')
  }
  return(
  <Result
    status="403"
    title="Oops..."
    subTitle={subtitle}
    extra={<Button type="primary" onClick={loginHandler}>Login</Button>}
  />
);
}

export default UnAuthorized;