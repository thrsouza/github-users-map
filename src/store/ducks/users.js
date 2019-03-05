/**
 * TYPES
 */
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE',
  REMOVE: 'users/REMOVE',
};

/**
 * REDUCERS
 */
const INITIAL_STATE = {
  loading: false,
  data: JSON.parse(localStorage.getItem('@gum/users')) || [],
  result: null,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ADD_SUCCESS: {
      const stateResult = {
        data: [...state.data, action.payload.data],
        loading: false,
        result: action.payload.result,
      };
      localStorage.setItem('@gum/users', JSON.stringify(stateResult.data));
      return stateResult;
    }
    case Types.ADD_FAILURE:
      return { ...state, loading: false, result: action.payload.result };
    case Types.REMOVE: {
      const stateResult = {
        ...state,
        data: state.data.filter(user => user.id !== action.payload.id),
      };
      localStorage.setItem('@gum/users', JSON.stringify(stateResult.data));
      return stateResult;
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  addUserRequest: (user, coordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, coordinates },
  }),

  addUserSuccess: (data, result) => ({
    type: Types.ADD_SUCCESS,
    payload: { data, result },
  }),

  addUserFailure: result => ({
    type: Types.ADD_FAILURE,
    payload: { result },
  }),
  removeUser: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
};
