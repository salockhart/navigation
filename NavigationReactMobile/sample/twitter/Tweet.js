import React from 'react';
import {NavigationBackLink, NavigationLink} from 'navigation-react';
import Tweets from './Tweets';

export default ({tweet: {account: {id: accountId, name, username, logo}, 
  text, time, retweets, likes, replies}, stateNavigator}) => (
  <div>
    <div className="banner">
      <NavigationBackLink
        distance={1}
        stateNavigator={stateNavigator}>
        <svg className="back" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.414l4.293-4.293a1 1 0 0 0-1.414-1.414l-6 6a1 1 0 0 0 0 1.414l6 6a.996.996 0 0 0 1.414 0 1 1 0 0 0 0-1.414L7.414 13H20a1 1 0 1 0 0-2z"></path>
          </g>
        </svg>
      </NavigationBackLink>
      <h1>Tweet</h1>
    </div>
    <div className="tweet">
      <div className="heading">
        <NavigationLink
          className="logo"
          stateKey="timeline"
          navigationData={{id: accountId}}
          stateNavigator={stateNavigator}>
          <img src={logo} alt={name}/>
        </NavigationLink>
        <div className="details">
          <div className="name">{name}</div>
          <div className="username">{username}</div>
        </div>
      </div>
      <div className="text">{text}</div>
      <div className="time">{time}</div>
      <div className="interactions">
        <div className="count">{retweets}</div>
        <div className="interaction">Retweets</div>
        <div className="count">{likes}</div>
        <div className="interaction">Likes</div>
      </div>
    </div>
    <Tweets tweets={replies} stateNavigator={stateNavigator} />
  </div>
);

