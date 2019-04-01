const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        auth: true,
        currentUser: action.payload.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: "",
        auth: false,
        currentUser: ""
      };

    default:
      return state;
  }
};

export default authReducer;
