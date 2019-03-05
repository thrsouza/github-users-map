import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select((state) => {
      const { data: users } = state.users;
      return users.find(user => user.id === data.id);
    });

    if (isDuplicated) {
      const result = {
        error: true,
        message: 'The user already exists!',
      };

      yield put(UserActions.addUserFailure(result));
    } else {
      const userData = {
        id: data.id,
        name: data.name || data.login,
        login: data.login,
        avatar: data.avatar_url,
        coordinates: action.payload.coordinates,
      };

      const result = {
        error: false,
        message: 'Successful operation!',
      };

      yield put(UserActions.addUserSuccess(userData, result));
    }
  } catch (error) {
    const result = {
      error: true,
      message: 'There was an error adding a new user!',
    };
    yield put(UserActions.addUserFailure(result));
  }
}
