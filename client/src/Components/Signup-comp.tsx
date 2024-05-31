import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { signupAtom } from "../States/atoms/user-atoms";
import axios from "axios";   
import Alert from "./ui/Alert";

export default function Signupcomp() {
  const [eye, setEye] = useState(false);
  const [eyeConf, setEyeConf] = useState(false);
  const [signup, setSignup] = useRecoilState(signupAtom);
  const [error,setError] = useState("");
  const handleSubmit = async() => {
    try {
      console.log("heelo")
      const response = await axios.post(`http://localhost:8000/api/auth/signup`, signup);
      console.log(response.data);
      if(response.status === 200){

      }
    } catch (error) {
      //@ts-ignore
      setError(error.response.data.error);
      return;
    }
  }
  return (
    <div className="Form flex flex-col items-center justify-center bg-white gap-4">
      <div className="bg-white">
        <label htmlFor="ProfilePicture" className="bg-white">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0QxSZCjz-8JefhrJrJwtL5i7utqDsRhv7Q&s"
            alt="profilepicture"
            className="h-20 rounded-full border-2 border-black/60 p-1 bg-white "
          />
        </label>
        <input
          type="file"
          placeholder="Choose profile picture"
          className=" hidden"
          id="ProfilePicture"
          onChange={(e) => {
            setSignup((prev) => ({
              ...prev,
              profilepicture: e.target.value,
            }));
          }}
          onClick={()=>{
            setError("");
          }}
        />
      </div>
      <div className="bg-white flex flex-col">
        <label htmlFor="name" className="bg-white text-sm px-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="(Optional)"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
          onChange={(e) => {
            setSignup((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
          onClick={()=>{
            setError("");
          }}
        />
      </div>
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
            setSignup((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
          onClick={()=>{
            setError("");
          }}
        />
        {error && <Alert error={error}/> }
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
            setSignup((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
          onClick={()=>{
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
      <div className="bg-white flex flex-col relative">
        <label htmlFor="confirmpassword" className="bg-white text-sm px-2">
          Confirm Password
        </label>
        <input
          type={eyeConf ? "text" : "password"}
          id="confirmpassword"
          placeholder="Confirm your password"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
          onChange={(e) => {
            setSignup((prev) => ({
              ...prev,
              confirmpassword: e.target.value,
            }));
          }}
          onClick={()=>{
            setError("");
          }}
        />
        <button
          onClick={() => {
            setEyeConf(!eyeConf);
          }}
        >
          {eyeConf ? (
            <FaRegEye className="absolute right-2 top-1/2 bg-white text-gray-400 transition-all duration-800" />
          ) : (
            <FaRegEyeSlash className="absolute right-2 top-1/2 bg-white text-gray-800 " />
          )}
        </button>
      </div>
      <button className="w-[250px] bg-[#8A6FF0] text-white rounded-[50px] py-2 font-bold"
      onSubmit={handleSubmit}
      onClick={handleSubmit}
      >
        Sign up
      </button>
    </div>
  );
}
