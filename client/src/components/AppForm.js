import React, { Component } from 'react';
import { Field, reset, reduxForm } from 'redux-form';

class AppForm extends Component {
  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <div className="ui small error message">
          <p>{error}</p>
        </div>
      );
    }
  }

  renderInput = formProps => {
    if (formProps.input.name === 'message') {
      return (
        <div className="field">
          <textarea
            {...formProps.input}
            placeholder={formProps.placeholder}
            autoComplete="off"
          />
          {this.renderError(formProps.meta)}
        </div>
      );
    } else {
      return (
        <div className="field">
          <input
            {...formProps.input}
            placeholder={formProps.placeholder}
            autoComplete="off"
          />
          {this.renderError(formProps.meta)}
        </div>
      );
    }
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="fullName"
          component={this.renderInput}
          placeholder="Full Name"
        />
        <Field name="email" component={this.renderInput} placeholder="Email" />
        <Field
          name="message"
          component={this.renderInput}
          placeholder="Message"
        />
        <button className="ui button primary fluid">Send</button>
      </form>
    );
  }
}

const validate = formValues => {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errors = {};

  if (re.test(formValues.email) === false) {
    errors.email = 'please enter a valid email';
  }
  if (!formValues.fullName) {
    errors.fullName = 'please enter your fullname';
  }
  if (!formValues.email) {
    errors.email = 'please enter your email';
  }
  if (!formValues.message) {
    errors.message = 'please leave a message';
  }
  return errors;
};

const afterSubmit = (result, dispatch) => dispatch(reset('AppForm'));

export default reduxForm({
  form: 'AppForm',
  validate,
  onSubmitSuccess: afterSubmit
})(AppForm);
