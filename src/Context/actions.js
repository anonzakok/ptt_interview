// const ROOT_URL = 'https://test.com';

export async function loginUser(dispatch, loginPayload) {
  // 	const requestOptions = {
  // 		method: 'POST',
  // 		headers: { 'Content-Type': 'application/json' },
  // 		body: JSON.stringify(loginPayload),
  // 	};

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    // let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    // let data = await response.json();
    const data = {
      username: "admin",
      password: "admin",
      userType: "admin",
      userList: loginPayload.userList,
      authToken: "token_mockup",
    };
    if (
      data.username === loginPayload.username &&
      data.password === loginPayload.password
    ) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: "username or password is incorrect." });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function register(dispatch, registerPayload) {
  try {
    dispatch({ type: "REQUEST_REGISTER" });
    if (
      registerPayload.fullName &&
      registerPayload.phoneNumber &&
      registerPayload.userList.length < registerPayload.guestLimit
    ) {
      registerPayload.userList.push({
        id: registerPayload.id,
        fullName: registerPayload.fullName,
        phoneNumber: registerPayload.phoneNumber,
        seatNo: "",
      });
      const data = {
        id: registerPayload.id,
        username: registerPayload.fullName,
        userType: "user",
        userList: registerPayload.userList,
        authToken: "token_mockup",
      };

      dispatch({ type: "REGISTER_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("userList", JSON.stringify(data.userList));
      return data;
    }

    dispatch({
      type: "REGISTER_ERROR",
      error:
        registerPayload.userList.length >= registerPayload.guestLimit
          ? "ผู้เข้าร่วมเต็มแล้ว"
          : "Register fail.",
    });
    return;
  } catch (error) {
    dispatch({ type: "REGISTER_ERROR", error: error });
  }
}

export async function editSeatNo(dispatch, editSeatNoPayload) {
  try {
    dispatch({ type: "REQUEST_EDIT" });
    if (editSeatNoPayload) {
      dispatch({ type: "EDIT_SUCCESS", payload: editSeatNoPayload });
      localStorage.setItem("currentUser", JSON.stringify(editSeatNoPayload));
      localStorage.setItem(
        "userList",
        JSON.stringify(editSeatNoPayload.userList)
      );
      return editSeatNoPayload;
    }

    dispatch({ type: "EDIT_ERROR", error: "edit fail" });
    return;
  } catch (error) {
    dispatch({ type: "EDIT_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
}
