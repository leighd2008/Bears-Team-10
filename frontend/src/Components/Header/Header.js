import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPaw } from 'react-icons/fa';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../redux/auth';

class Header extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="header-div">
        <div className="logo">
          <FaPaw />
          <Link to="/">
            <h1 className="header-title">Bairs</h1>
          </Link>
        </div>
        <p>
          <span>Welcome! </span>
          {user && user.isLoggedIn ? (
            <span>
              {user.user.username}
              <Button
                className=""
                href="#"
                onClick={async e => {
                  e.preventDefault();
                  this.props.logout(() => this.props.history.push('/'));
                }}
              >
                <span> Logout?</span>
              </Button>
            </span>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Header)
);
