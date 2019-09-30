import React, { Component } from 'react';
import PageHeader from './PageHeader';
import { connect } from 'react-redux';
import { fectchConfig, updateResumeStatus, hideMenu } from '../actions';
import _ from 'lodash';

import ResumeData from './ResumeData';
import './resume.css';

class Resume extends Component {
  componentDidMount() {
    this.props.fectchConfig(this.props.match.path);
    this.props.hideMenu(true);
  }

  renderKeys() {
    const { resume } = this.props.appData;
    const resumeKeys = Object.keys(resume);
    return resumeKeys.map(key => {
      return (
        <div
          className={`item ${
            resume[key].active === true ? 'active' : ''
          } itemDiv`}
          id={resume[key].id}
          key={key}
          onClick={() => this.updateStatus(resume[key].id)}
        >
          {key}
        </div>
      );
    });
  }

  updateStatus(id) {
    const resumeData = { ...this.props.appData.resume };
    Object.keys(resumeData).forEach(key => {
      resumeData[key].id === id
        ? (resumeData[key].active = true)
        : (resumeData[key].active = false);
    });
    this.props.updateResumeStatus(resumeData);
  }

  renderTabContent() {
    const resumeData = { ...this.props.appData.resume };
    let resumeKey = '';
    Object.keys(resumeData).forEach(key => {
      if (resumeData[key].active === true) resumeKey = key;
    });
    switch (resumeKey) {
      case 'Work':
        return resumeData.Work.data.map(data => {
          return (
            <ResumeData
              key={data.date}
              date={data.date}
              institution={data.company}
              logo={data.logo}
              header={data.title}
              link={data.companyWebsite}
              details={data.details}
            />
          );
        });
      case 'Education':
        return resumeData.Education.data.map((data, index) => {
          return (
            <ResumeData
              key={data.course}
              date={data.date}
              institution={data.institution}
              logo={data.logo}
              header={`${data.course} ${data.certificate}`}
              link={data.link}
              details={[]}
            />
          );
        });
      case 'Skills':
        return (
          <div className="skillsContainer">
            {this.renderskils(resumeData.Skills.data)}
          </div>
        );
      default:
        return <div>Loadding</div>;
    }
  }

  renderskils(skillsData) {
    return skillsData.map((data, index) => {
      return (
        <div key={index} className="skillsFlex">
          <div className="skillCard">
            <div className="skillCardimg">
              <img
                className="skillCardimg"
                alt={data.title}
                src={require(`../img/${data.logo}`)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="skillCardcontainer" style={{ textAlign: 'center' }}>
              <div className="description">{data.title}</div>
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
    const { title, description } = this.props.appData.pages.resume;
    return (
      <div className="animated pageContent fadeIn" id="style-3">
        <PageHeader pageTitle={title} description={description} />
        <div className="PageContentText">
          <div className="ui pointing menu tabsHorizontal">
            {this.renderKeys()}
          </div>
          <div className="ui grid">
            <div className="four wide column tabsVertical">
              <div className="ui vertical fluid tabular menu">
                {this.renderKeys()}
              </div>
            </div>
            <div className="twelve wide stretched column">
              <div className="ui contentData" style={{ textAlign: 'left' }}>
                <div className="ui middle aligned small divided list">
                  {this.renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { appData: state.appData };
};

export default connect(
  mapStateToProps,
  { fectchConfig, updateResumeStatus, hideMenu }
)(Resume);
