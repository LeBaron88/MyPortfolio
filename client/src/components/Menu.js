import React from 'react';
import { connect } from 'react-redux';

import { hideMenu } from '../actions';
import Navigation from './Navigation';
import resume from '../documents/resume.pdf';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }
  componentDidUpdate() {
    if (this.props.hMenu.status) {
      this.menuRef.current.style.left = '-300px';
    } else {
      this.menuRef.current.style.transition = 'left 0.7s ease-in 0s';
      this.menuRef.current.style.left = '0px';
    }
  }
  toggleMenu = () => {
    this.props.hideMenu(!this.props.hMenu.status);
  };

  render() {
    const { fullName, downloadLink, credit } = this.props.appData;

    return (
      <>
        <div
          style={{ textAlign: 'center' }}
          className="ui blue vertical pointing menu menuLeft"
        >
          <img
            className="skillCardimg"
            alt="my logo"
            src={require(`../img/sm_logo.png`)}
            style={{ width: '100%' }}
          />
          <div className="name">{fullName}</div>
          <Navigation />

          <a href={resume} target="_blank" rel="noopener noreferrer">
            <button className="ui primary basic button downloadButton">
              {downloadLink}
            </button>
          </a>

          <div className="credit">{credit}</div>
        </div>

        <div
          style={{ textAlign: 'center' }}
          className="ui blue vertical pointing pMenu menu animated slideInLeft"
          ref={this.menuRef}
        >
          <img
            className="skillCardimg"
            alt="my logo"
            src={require(`../img/sm_logo.png`)}
            style={{ width: '100%' }}
          />
          <div className="name">{fullName}</div>
          <Navigation />
          <div className="credit">{credit}</div>
        </div>
        <div className="ui basic fixed icon menu tMenu">
          <div id="menuToggle" className="item" onClick={this.toggleMenu}>
            <i className="sidebar large icon"></i>
          </div>

          <div className="item" style={{ flexGrow: '8' }}></div>
          <div className="item" style={{ textAlign: 'right' }}>
            <a href={resume} target="_blank" rel="noopener noreferrer">
              {downloadLink}
            </a>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ appData, hMenu }) => {
  return { appData, hMenu };
};

export default connect(
  mapStateToProps,
  { hideMenu }
)(Menu);
