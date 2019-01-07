import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPaw } from 'react-icons/fa';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../redux/auth';
import { clearProjectData } from '../../redux/projects';
import CommunityProjects from '../CommunityProjects/CommunityProjects';
import CommunityPosts from '../CommunityPosts/CommunityPosts';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    const { user, allProjects, displayPosts, onClickPosts } = this.props;
    return (
      <div className="header-div">
        <div className="logo">
          <FaPaw />
          <Link to="/">
            <h1 className="header-title">Bairs</h1>
          </Link>
        </div>
        {/* <p> */}
        <span>Welcome! </span>
        {user && user.isLoggedIn ? (
          <span>
            {user.user.username}
            <Button
              className=""
              href="#"
              onClick={async e => {
                e.preventDefault();
                await this.props.logout();
                this.props.clearProjectData();
                this.props.history.push('/');
              }}
            >
              <span> Logout?</span>
            </Button>
            {(() => {
              switch (displayPosts) {
                case true:
                  return (
                    <CommunityPosts
                      displayPosts={displayPosts}
                      onClickPosts={onClickPosts}
                    />
                  );
                default:
                  return (
                    <CommunityProjects
                      allProjects={allProjects}
                      displayPosts={displayPosts}
                      onClickPosts={onClickPosts}
                    />
                  );
              }
            })()}
          </span>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
        {/* </p> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    allProjects: state.projects.allProjects,
  };
}

Header.propTypes = {
  clearProjectData: PropTypes.func.isRequired,
  onClickPosts: PropTypes.func.isRequired,
  displayPosts: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allProjects: PropTypes.array.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout, clearProjectData }
  )(Header)
);
