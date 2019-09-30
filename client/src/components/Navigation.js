import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Navigation extends React.Component {
  renderLinks() {
    if (_.isEmpty(this.props.appData)) {
      return <div></div>;
    }
    const { links } = this.props.appData;
    return links.map(({ to, id, active, title, icon }) => {
      return (
        <Link
          to={to}
          key={id}
          className={active === true ? 'item active' : 'item'}
        >
          {title}
          <i className={`${icon} icon`}></i>
        </Link>
      );
    });
  }

  render() {
    return <>{this.renderLinks()}</>;
  }
}

const mapStateToProps = ({ appData }) => {
  return { appData };
};

export default connect(mapStateToProps)(Navigation);
