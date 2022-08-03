import React from 'react';
import {Layout, Input, Icon, Badge} from 'antd';

const {Header} = Layout;
const {Search} = Input;

const TwitterHeader = ({searchTweets, tweetsData}) => (
  <Header>
    <Search
      placeholder="Search Tweets"
      onSearch={value => {
        if (value && value !== '') {
          searchTweets(value);
        }
      }}
      enterButton
    />
    <Badge count={tweetsData.data && tweetsData.data.notifications}>
      <Icon type="bell" />
    </Badge>
  </Header>
);
export default TwitterHeader;
