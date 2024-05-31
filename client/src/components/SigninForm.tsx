import Signupcomp from "./Signup-comp";
import SIgnincomp from "./SIgnin-comp";
import { useRecoilState } from "recoil";
import { loginState } from "../States/atoms/signin-signup";

export default function SigninForm() {
  const [type, setType] = useRecoilState(loginState);
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center bg-white">
        <h1 className="bg-white font-bold font-roboto text-4xl">Welcome</h1>
        <p className="bg-white text-sm text-gray-600 font-roboto">
          Please enter your details to proceed further
        </p>
        <div className="flex justify-center items-center gap-10 bg-white my-4">
          <button
            onClick={() => {
              setType("signin");
            }}
            className={`${
              type === "signin" ? "bg-[#8A6FF0] text-white" : "bg-white"
            }   px-4 font-semibold rounded-[50px] py-2 transition-all duration-500`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setType("signup");
            }}
            className={`${
              type === "signup" ? "bg-[#8A6FF0] text-white" : "bg-white"
            }   px-4 font-semibold rounded-[50px] py-2  transition-all duration-500`}
          >
            Sign Up
          </button>
        </div>
      </div>
      {type==="signup" ? <Signupcomp/> : <SIgnincomp/>}
    </div>
  );
}
