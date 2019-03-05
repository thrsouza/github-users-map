import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Creators as UserActions } from '../../store/ducks/users';

import './styles.scss';

const SideBar = ({ users, removeUser }) => (
  <div className="sidebar">
    <div className="title">
      <h1>Github Users Map</h1>
    </div>
    {!users.data.length && (
      <p>
        {'Click on the map and add user! '}
        <i className="fab fa-github" />
      </p>
    )}
    <ul>
      {users.data.map(user => (
        <li key={user.id}>
          <div>
            <img src={user.avatar} alt="" />
            <div className="user-info">
              <strong>{user.name}</strong>
              <span>{user.login}</span>
            </div>
            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github-square go-to-page" />
            </a>
            <button
              type="button"
              onClick={() => {
                removeUser(user.id);
              }}
            >
              <i className="fa fa-times remove" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

SideBar.propTypes = {
  users: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        login: PropTypes.string,
        avatar: PropTypes.string,
      }),
    ),
  }).isRequired,
  removeUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
