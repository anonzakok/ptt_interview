import React, { useState } from "react";
import { Input, Button } from "rsuite";
import { register, useAuthState, useAuthDispatch } from "../../Context";

function RegisterPage(props) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useAuthDispatch();
  const { userList, loading, errorMessage, guestLimit } = useAuthState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await register(dispatch, {
        id: userList.length + 1,
        fullName,
        phoneNumber,
        userList,
        guestLimit,
      });
      if (!response?.username) return;
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        "min-h-screen w-full flex justify-center items-center col-gap-3"
      }
    >
      <div className={"w-auto"}>
        <h1 className="text-3xl font-bold mb-5">Register Event Something</h1>
        <p className={"h-4 text-xs text-red-700"}>{errorMessage || ""}</p>
        <form>
          <div className={"flex flex-col"}>
            <div className={"flex flex-col mb-2"}>
              <label htmlFor="fullName">Full name</label>
              <Input
                size="md"
                placeholder=""
                maxLength={100}
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e)}
                disabled={loading}
              />
            </div>
            <div className={"flex flex-col mb-2"}>
              <label htmlFor="phoneNumber">Phone number</label>
              <Input
                size="md"
                placeholder="XXXXXXXXXX"
                maxLength={10}
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e)}
                disabled={loading}
              />
            </div>
          </div>
          <Button
            className={"w-full mt-4"}
            onClick={handleLogin}
            disabled={loading}
            appearance="ghost"
          >
            Register
          </Button>
        </form>
        <Button
          className="absolute right-1 bottom-1"
          onClick={() => props.history.push("/admin")}
          disabled={loading}
          appearance="ghost"
        >
          Admin
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
