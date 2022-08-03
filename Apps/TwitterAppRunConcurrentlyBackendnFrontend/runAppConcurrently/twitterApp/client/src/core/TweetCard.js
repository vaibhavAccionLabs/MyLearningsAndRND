import React from 'react';
import dayjs from 'dayjs';
import {Avatar} from 'antd';

const TweetCard = ({data, key}) => {
  return (
    <div key={key} className="twitter-card">
      <div className="twitter-header">
        <div className="user-image">
          <Avatar src={data.user.profile_image_url_https} icon="user" />
        </div>
        <div className="user-data">
          <span className="user-name">{data.user.name}</span>
          <span className="screen-name">@{data.user.screen_name}</span>
          <span className="tweet-created-on">
            - {dayjs(data.created_at).format('MMM,DD')}
          </span>
        </div>
      </div>
      <div className="twitter-content">
        <div className="tweet">{data.text}</div>
        <div className="tweet-media">
          {data.entities.media &&
            data.entities.media[0] &&
            data.entities.media[0].type === 'photo' && (
              <img src={data.entities.media[0].media_url_https} />
            )}
        </div>
        <div className="tweet-hash-tags">
          {data.entities.hashtags.map(hastag => (
            <span className="hash-tag">#{hastag.text}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
