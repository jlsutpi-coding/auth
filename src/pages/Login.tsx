import { useContext, useEffect, useRef, useState } from "react";

import { FaTimes } from "react-icons/fa";

import type { User } from "../types/user";
import AuthContext from "../context/AuthProvider";
import baseUrl from "../api/api";

interface LoginPayload {
  login: string;
  password: string;
}

interface LoginResponse {
  message: string;
  success: boolean;
  token?: string;
  user?: User
  ;
}

const LOGIN_URL = "auth/login";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const context = useContext(AuthContext);
  if (!context) return;
  const { setAuth } = context;

  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: LoginPayload = { login, password: pwd };
      const response = await fetch(`${baseUrl}/${LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid username or password.");
        }
        if (response.status === 403) {
          throw new Error("Your account is locked or suspended.");
        }
        throw new Error(`Server error: ${response.status}`);
      }
      const data: LoginResponse = await response.json();
      console.log("Login successful:", data);
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
      }
      setAuth({ user: data.user, accessToken: data.token });
      setPwd("");
      setLogin("");
      setSuccess(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrMsg(message);
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <section className=" flex flex-col w-100 items-center rounded-xl mx-auto  gap-2 bg-[#4B4038] ">
      <div className="w-full">
        <p
          ref={errRef}
          className={`${errMsg ? "bg-red-500 mx-6 py-1 flex items-center gap-2 justify-center text-white mt-4  rounded-lg " : "hidden"}`}
          aria-live="assertive"
        >
          <FaTimes />
          {errMsg}
        </p>
      </div>
      <h1 className=" text-[#CAAA98] text-xl font-semibold ">Login</h1>
      <form
        className="w-full flex flex-col gap-2  px-6 py-2"
        onSubmit={handleSubmit}
      >
        {/* {login} */}
        <div className=" w-full">
          <label htmlFor="login">Username or Email: </label>
          <input
            type="text"
            id="login"
            ref={userRef}
            autoComplete="off"
            className=" focus:outline-1 w-full focus:outline-[#9A8678] border text-[#CAAA98] px-2 py-2 rounded-lg"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
            ) => {
              setLogin(e.target.value);
            }}
            value={login}
            required
          />
        </div>

        {/* {Password} */}
        <div className=" w-full">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className=" focus:outline-1 w-full focus:outline-[#9A8678] border text-[#CAAA98] px-2 py-2 rounded-lg"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
            ) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            required
          />
        </div>

        {/* Submit Button */}
        <div className=" w-full">
          <button className="w-full rounded-lg font-bold text-lg cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed bg-[#1A1953] text-[#CAAA98] py-2 mt-4">
            Sign In
          </button>
        </div>
        <div>
          Don't have acc? <br />
          {/* <Link to={"/login"} className=" underline"> */}
          <span className=" underline cursor-pointer">Register </span>
          {/* </Link> */}
        </div>
      </form>
    </section>
  );
};

export default Login;
