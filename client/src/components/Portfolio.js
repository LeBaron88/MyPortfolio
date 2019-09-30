import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import PageHeader from './PageHeader';
import { fectchConfig, hideMenu } from '../actions';
import './portfolio.css';

class Portfolio extends Component {
  componentDidMount() {
    this.props.fectchConfig(this.props.match.path);
    this.props.hideMenu(true);
  }

  renderProjects() {
    const { portfolio } = this.props.appData;

    return portfolio.map((data, index) => {
      return (
        <div key={index} className="projectCard pCard">
          <div
            className="wrapper"
            style={{
              background: `linear-gradient(
              to top,
              rgba(0, 0, 0, 1),
              rgba(0, 0, 0, 0.4)
            ), url(${require(`../img/${data.picture}`)}) center / cover no-repeat`
            }}
          >
            <div className="header">
              <ul className="menu-content">
                <li>
                  <a href={data.link} target="_blank" rel="noopener noreferrer">
                    <i className="external link icon"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="data">
              <div className="content">
                <span className="author">{data.technology}</span>
                <h1 className="title">
                  <a href={data.link} target="_blank" rel="noopener noreferrer">
                    {data.title}
                  </a>
                </h1>
                <p className="text">{data.description}</p>
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  <i className="github icon"></i>
                  View Code
                </a>
              </div>
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
          <div className="ui large text loader">Loading data ...</div>
        </div>
      );
    }
    return (
      <div className="animated pageContent fadeIn" id="style-3">
        <PageHeader pageTitle="Portfolio" description="My projects" />
        <div className="PageContentText"></div>
        <div className="pRow">{this.renderProjects()}</div>
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
)(Portfolio);
