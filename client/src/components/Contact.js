import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PageHeader from './PageHeader';
import AppForm from './AppForm';
import { updateMailConfirmation, fectchConfig, hideMenu } from '../actions';
import './contact.css';

class Contact extends Component {
  componentDidMount() {
    this.props.fectchConfig(this.props.match.path);
    this.props.hideMenu(true);
  }
  onSubmit = formValues => {
    this.props.updateMailConfirmation(formValues);
  };

  renderSuccessMessage() {
    const { mailConfirmation } = this.props.appData.contact;
    if (mailConfirmation) {
      return (
        <div class="ui success message">
          <p>{mailConfirmation}</p>
        </div>
      );
    }
  }

  render() {
    if (_.isEmpty(this.props.appData)) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading data ...</div>
        </div>
      );
    }
    const { contactText } = this.props.appData.contact;
    const { title, description } = this.props.appData.pages.contact;
    return (
      <div className="animated fadeIn pageContent" id="style-3">
        <PageHeader pageTitle={title} description={description} />
        <div className="PageContentText contactHeader">
          <div style={{ marginBottom: '20px' }}>{contactText}</div>
          {this.renderSuccessMessage()}

          <AppForm onSubmit={this.onSubmit} />
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
  { updateMailConfirmation, fectchConfig, hideMenu }
)(Contact);
