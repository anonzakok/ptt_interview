let id = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).id
  : "";
let username = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).username
  : "";
let userType = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).userType
  : "";
let userList = localStorage.getItem("userList")
  ? JSON.parse(localStorage.getItem("userList"))
  : [];
let authToken = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).authToken
  : "";
export const initialState = {
  id: id,
  username: username,
  authToken: authToken,
  userType: userType,
  userList: userList,
  guestLimit: 10,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        errorMessage: "",
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        id: id,
        username: action.payload.username,
        userType: action.payload.userType,
        userList: action.payload.userList
          ? action.payload.userList
          : initialState.userList,
        authToken: action.payload.authToken,
        errorMessage: "",
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        username: "",
        authToken: "",
        errorMessage: "",
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "REQUEST_REGISTER":
      return {
        ...initialState,
        errorMessage: "",
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...initialState,
        id: id,
        username: action.payload.username,
        userType: action.payload.userType,
        userList: action.payload.userList
          ? action.payload.userList
          : initialState.userList,
        authToken: action.payload.authToken,
        errorMessage: "",
        loading: false,
      };
    case "REGISTER_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    case "REQUEST_EDIT":
      return {
        ...initialState,
        loading: true,
        errorMessage: "",
      };
    case "EDIT_SUCCESS":
      return {
        ...initialState,
        id: id,
        username: action.payload.username,
        userType: action.payload.userType,
        userList: action.payload.userList
          ? action.payload.userList
          : initialState.userList,
        authToken: action.payload.authToken,
        errorMessage: "",
        loading: false,
      };
    case "EDIT_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
