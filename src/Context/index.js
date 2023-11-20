import { loginUser, register, editSeatNo, logout } from "./actions";
import { ContextProvider, useAuthDispatch, useAuthState } from "./context";

export {
  ContextProvider,
  useAuthState,
  useAuthDispatch,
  loginUser,
  register,
  editSeatNo,
  logout,
};
