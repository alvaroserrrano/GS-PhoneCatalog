import { LOGIN_FAIL, LOGIN_REQUEST } from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/api/v1/users/login', {
      email,
      password,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
