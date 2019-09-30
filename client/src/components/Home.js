import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fectchConfig, hideMenu } from '../actions';
import './home.css';

class Home extends Component {
  componentDidMount() {
    this.props.fectchConfig(this.props.match.path);
    this.props.hideMenu(true);
  }
  renderChannels() {
    return this.props.appData.channels.map((channel, index) => {
      return (
        <div key={index} className="item">
          <div className="content">
            <div className="header">
              <a href={channel.link} target="_blank" rel="noopener noreferrer">
                <i className={`${channel.icon} big icon`}></i>
                {channel.title}
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    if (_.isEmpty(this.props.appData)) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading data...</div>
        </div>
      );
    }
    const { greeting, fullName, title, description } = this.props.appData;
    return (
      <div className="animated fadeIn pageHome" id="style-3">
        <div>
          <div className="ui huge header">
            <span className="smallText">{greeting}</span>
            <span className="bigText">{fullName}</span>
          </div>
          <div className="pTextDiv">
            <div className="pTextBottom">
              <div className="pText">
                {title}
                {description}
                <br />
                <div className="ui right floated large horizontal divided list">
                  {this.renderChannels()}
                </div>
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ appData }) => {
  return { appData };
};

export default connect(
  mapStateToProps,
  { fectchConfig, hideMenu }
)(Home);
