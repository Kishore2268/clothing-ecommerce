import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { 
        ...state, 
        isLoading: true, 
        error: null 
      };

    case REGISTER_SUCCESS:
      return { 
        ...state, 
        isLoading: false,
        error: null
      };

    case LOGIN_SUCCESS:
      return { 
        ...state, 
        isLoading: false,
        error: null,
        isAuthenticated: true
      };

    case GET_USER_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        user: action.payload,
        isAuthenticated: true,
        error: null
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload,
        isAuthenticated: false 
      };

    case LOGOUT:
      return { 
        ...initialState 
      };

    default:
      return state;
  }
};

export default authReducer;
