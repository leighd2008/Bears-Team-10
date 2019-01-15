import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Projects.css';

// eslint-disable-next-line react/prefer-stateless-function
class Projects extends React.Component {
  render() {
    const project_id =
      this.props.project_id || this.props.match.params.project_id;
    const parentSource = this.props.project_id ? 'community' : 'individual';
    const thisProject = this.props.allProjects.filter(
      project => project.project_id === project_id
    );
    return (
      <div className="project">
        <div className="projectText" role="presentation">
          <div className="projectTitle">
            <span>
              {thisProject.length ? thisProject[0].project_title : ''}
            </span>
          </div>
          <div className="projectDescription">
            <span>
              {thisProject.length ? thisProject[0].project_description : ''}
            </span>
          </div>
          {parentSource === 'individual' ? (
            <ul className="posts">
              {this.props.allPosts
                .filter(post => post.project_id === project_id)
                .map(post => (
                  <li>{post.post_content}</li>
                ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPosts: state.posts.allPosts,
    allProjects: state.projects.allProjects,
  };
}

export default connect(
  mapStateToProps,
  null
)(Projects);
