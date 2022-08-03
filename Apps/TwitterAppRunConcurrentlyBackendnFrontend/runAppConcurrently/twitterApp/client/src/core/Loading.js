import React from 'react';
import {Spin, Icon} from 'antd';

const antIcon = <Icon type="loading" style={{fontSize: 24}} spin />;

const Loading = () => (
  <div className="loading">
    <Spin indicator={antIcon} />
    Loading....
  </div>
);

export default Loading;
