import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Layout, Spin, Button} from 'antd';

import {TweetCard, TwitterHeader, Footer} from '../core';

import {searchTweets, loadMoreTweets, getTweets} from '../redux';

const {Content} = Layout;
// Main App

const Tweets = ({searchTweets, loadMoreTweets, tweetsData, history}) => {
  let morePages = 0;
  if (tweetsData.data) {
    morePages = tweetsData.data.totalPages - tweetsData.data.page;
  }
  return (
    <Layout>
      <TwitterHeader searchTweets={searchTweets} tweetsData={tweetsData} />
      <Content>
        {tweetsData.error && !tweetsData.request && (
          <span className="error">Something went wrong try again later!</span>
        )}
        <Spin spinning={tweetsData.request} tip="Loading...">
          {tweetsData.data &&
            tweetsData.data.tweets.map(({tweet, _id}, index) => (
              <TweetCard data={tweet} key={`${index}-tweet`} />
            ))}
        </Spin>
        {!tweetsData.error && !tweetsData.request && morePages > 0 && (
          <Button
            onClick={() =>
              loadMoreTweets(
                tweetsData.data.page + 1,
                tweetsData.data.totalPages,
                tweetsData.data.count
              )
            }>
            LOAD MORE...
          </Button>
        )}
        {tweetsData.data &&
          tweetsData.data.page === tweetsData.data.totalPages && (
            <div className="more-info">That's all folks</div>
          )}
      </Content>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => ({
  tweetsData: getTweets(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      searchTweets,
      loadMoreTweets,
    }
  )(Tweets)
);
