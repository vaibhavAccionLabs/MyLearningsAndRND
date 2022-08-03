import React from 'react';
import { Layout } from 'antd';

const Footer = () => (
  <Layout.Footer>
    <span>&copy; Copyright {new Date().getFullYear()}</span>
  </Layout.Footer>
);

export default Footer;
