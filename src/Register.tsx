import { useEffect, useRef, useState } from "react";

import { FaCheck, FaTimes } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = pwd === matchPwd;
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry!");
      if (errRef.current) {
        errRef.current.focus();
      }
      return;
    }
    try {
    } catch (error) {}
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
      <h1 className=" text-[#CAAA98] text-xl font-semibold ">Register</h1>
      <form
        className="w-full flex flex-col gap-2  px-6 py-2"
        onSubmit={handleSubmit}
      >
        {/* {User} */}
        <div className=" w-full">
          <label
            htmlFor="username"
            className="flex items-center  text-[#CAAA98] bg-red0 gap-1"
          >
            Username:
            <span
              className={`${validName ? "valid text-[#0D0B61]" : "hide hidden"}`}
            >
              <FaCheck />
            </span>
            <span
              className={
                validName || !user ? "hide hidden" : "invalid text-[#D62828]"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser(e.target.value)}
            required
            ref={userRef}
            autoComplete="off"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            className=" focus:outline-1 w-full focus:outline-[#9A8678] border text-[#CAAA98] px-2 py-2 rounded-lg"
          />
          <p
            id="uidnote"
            className={`${userFocus && user && !validName ? "instructions text-[#CAAA98] bg-[#202940] px-4 py-2 mt-2 rounded-lg  " : "offscreen hidden"}`}
          >
            <FiInfo />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>

        {/* {Password} */}
        <div className=" w-full">
          <label
            htmlFor="password"
            className="flex items-center  text-[#CAAA98] bg-red0 gap-1"
          >
            Password:
            <span
              className={`${validPwd ? "valid text-[#0D0B61]" : " hidden"}`}
            >
              <FaCheck />
            </span>
            <span
              className={
                validPwd || !pwd ? " hidden" : "invalid text-[#D62828]"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            className=" focus:outline-1 w-full focus:outline-[#9A8678] border text-[#CAAA98] px-2 py-2 rounded-lg"
          />
          <p
            id="pwdnote"
            className={`${pwdFocus && pwd && !validPwd ? "instructions text-[#CAAA98] bg-[#202940] px-4 py-2 mt-2 rounded-lg  " : "offscreen hidden"}`}
          >
            <FiInfo />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and a sepical
            character. <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </div>

        {/* {Confirm Password} */}
        <div className=" w-full">
          <label
            htmlFor="confirm-password"
            className="flex items-center  text-[#CAAA98] bg-red0 gap-1"
          >
            Confirm Password:
            <span
              className={`${validMatchPwd && matchPwd ? "valid text-[#0D0B61]" : " hidden"}`}
            >
              <FaCheck />
            </span>
            <span
              className={
                validMatchPwd || !matchPwd
                  ? " hidden"
                  : "invalid text-[#D62828]"
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            type="password"
            id="confirm-password"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            onFocus={() => setMatchPwdFocus(true)}
            onBlur={() => setMatchPwdFocus(false)}
            aria-invalid={validMatchPwd ? "false" : "true"}
            aria-describedby="confirmnote"
            className=" focus:outline-1 w-full focus:outline-[#9A8678] border text-[#CAAA98] px-2 py-2 rounded-lg"
          />
          <p
            id="confirmnote"
            className={`${matchPwdFocus && !validMatchPwd ? "instructions text-[#CAAA98] bg-[#202940] px-4 py-2 mt-2 rounded-lg  " : "offscreen hidden"}`}
          >
            <FiInfo />
            Must match the first password input field.
          </p>
        </div>
        {/* Submit Button */}
        <div className=" w-full">
          <button
            className="w-full rounded-lg font-bold text-lg cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed bg-[#1A1953] text-[#CAAA98] py-2 mt-4"
            disabled={!validName || !validPwd || !validMatchPwd}
          >
            Sign up
          </button>
        </div>
        <div>
          Already registered? <br />
          {/* <Link to={"/login"} className=" underline"> */}
          <span className=" underline cursor-pointer">Sign In</span>
          {/* </Link> */}
        </div>
      </form>
    </section>
  );
};

export default Register;
