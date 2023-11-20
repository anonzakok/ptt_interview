import React, { useState } from "react";
import { Input, InputGroup, Button } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context";

function Admin(props) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useAuthDispatch();
  const { userList, loading, errorMessage } = useAuthState();

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await loginUser(dispatch, {
        username,
        password,
        userList,
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
      <div className={"w-48"}>
        <h1 className="text-3xl font-bold mb-5">Admin Page</h1>
        <p className={"h-4 text-xs text-red-700"}>{errorMessage || ""}</p>
        <form>
          <div className={"flex flex-col"}>
            <div className={"flex flex-col mb-2"}>
              <label htmlFor="username">Username</label>
              <Input
                size="md"
                placeholder="username"
                id="username"
                value={username}
                onChange={(e) => setusername(e)}
                disabled={loading}
              />
            </div>
            <div className={"flex flex-col mb-2"}>
              <label htmlFor="password">Password</label>
              <InputGroup inside>
                <Input
                  type={visible ? "text" : "password"}
                  size="md"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e)}
                  disabled={loading}
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </div>
          </div>
          <Button
            className={"w-full mt-4"}
            onClick={handleLogin}
            disabled={loading}
            appearance="ghost"
          >
            login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
