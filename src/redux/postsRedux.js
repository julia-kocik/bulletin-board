/* selectors */
export const getAll = ({posts}) => posts.data;
export const getOne = ({posts}, id) => posts.data.filter(item => item.id === id); 
export const isLogged = item => item;


/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({payload, type: ADD_POST});
export const editPost = payload => ({payload, type: EDIT_POST});
export const logIn = payload => ({payload, type: LOG_IN});
export const logOut = payload => ({payload, type: LOG_OUT});

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    /*
      case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
      case EDIT_POST: {
        return {
          ...statePart,
          data: statePart.data.map(item => item.id == action.payload.id ? action.payload : post),
        }
      }
      case LOG_IN: {
        return {
          ...statePart,
          logged: true,
        }
      }
      case LOG_OUT: {
        return {
          ...statePart,
          logged: false,
        }
      }
    */
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload ],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart, 
        data: statePart.data.map(post => post.id === action.payload.id ? action.payload : post),
      };
    }
    case LOG_IN: {
      return {
        ...statePart, 
        logged: true,
      };
    }
    case LOG_OUT: {
      return {
        ...statePart,
        logged: false,
      };
    }
    default:
      return statePart;
  }
};
