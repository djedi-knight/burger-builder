import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Reducers - Auth', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'test-id-token',
      userId: 'test-user-id'
    })).toEqual({
      token: 'test-id-token',
      userId: 'test-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});