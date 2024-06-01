import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import axios from "axios";
import Alert from "./ui/Alert";
import {  useSetRecoilState } from "recoil";
import { userAtom } from "../States/atoms/user-atoms";

interface SigninProps {
  username: string;
  password: string;
}

export default function SIgnincomp() {
  const [eye, setEye] = useState(false);
  const [error, setError] = useState("");
  const [signin, setSignin] = useState<SigninProps>({
    username: "",
    password: "",
  });;
  const setUser = useSetRecoilState(userAtom);


  const handleSignin = async () => {
    try {
      if (signin.username === "" || signin.password === "") {
        setError("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        signin,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        setError("");
        window.location.href = "/feed";
      }
    } catch (error) {
      //@ts-ignore
      setError(error.response?.data?.error || "An error occurred");
      return;
    }
  };
  return (
    <div className="Form flex flex-col items-center justify-start bg-white gap-2">
      <div className="bg-white flex flex-col">
        <label htmlFor="username" className="bg-white text-sm px-2">
          Username
        </label>
        <input
          required
          type="text"
          id="username"
          placeholder="Should be unique"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
          onChange={(e) => {
            setSignin((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
          onClick={() => {
            setError("");
          }}
        />
      </div>
      <div className="bg-white flex flex-col relative">
        <label htmlFor="password" className="bg-white text-sm px-2">
          Password
        </label>
        <input
          type={eye ? "text" : "password"}
          id="password"
          placeholder="Should be 8 letters"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
          onChange={(e) => {
            setSignin((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
          onClick={() => {
            setError("");
          }}
        />
        <button
          onClick={() => {
            setEye(!eye);
          }}
        >
          {eye ? (
            <FaRegEye className="absolute right-2 top-1/2 bg-white text-gray-400 transition-all duration-800" />
          ) : (
            <FaRegEyeSlash className="absolute right-2 top-1/2 bg-white text-gray-800 " />
          )}
        </button>
      </div>

      {error && <Alert error={error} />}
      <button
        className="w-[250px] bg-[#8A6FF0] text-white rounded-[50px] py-2 font-bold"
        onClick={handleSignin}
        onSubmit={handleSignin}
      >
        Log In
      </button>
    </div>
  );
}
