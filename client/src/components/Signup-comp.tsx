import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { signupAtom } from "../States/atoms/user-atoms";
import axios from "axios";
import Alert from "./ui/Alert";
import { loginState } from "../States/atoms/signin-signup";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../lib/firebase";

export default function Signupcomp() {
  const [eye, setEye] = useState(false);
  const [error, setError] = useState("");
  const [eyeConf, setEyeConf] = useState(false);
  const [type, setType] = useRecoilState(loginState);
  const [signup, setSignup] = useRecoilState(signupAtom);
  const [isTandCChecked, setIsTandCChecked] = useState(false);
  const [image, setImage] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [uploadImage, setuploadImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingcomplete, setloadingcomplete] = useState(false);

  const handleSubmit = async () => {
    if (
      signup.username === "" ||
      signup.password === "" ||
      signup.confirmpassword === ""
    ) {
      setError("Please fill all the fields");
      return;
    }
    if (!isTandCChecked) {
      setError("You must accept the terms and conditions.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        signup
      );
      if(response.status === 429){
        setError("Too many accounts created from this IP, please try again after 5 minutes");
      }
      if (response.status === 200) {
        setError("");
        setType("signin");
      }
    } catch (error) {
      //@ts-ignore
      setError(error.response?.data?.error || "Too many requests, please try again after 5 minutes");
      console.log(type,loading,loadingcomplete)
      return;
    }
  };

  useEffect(() => {
    if (uploadImage && image) upload();
    else if (uploadImage) setError("Please select an image");
  }, [uploadImage]);

  const HandleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setuploadImage(false);
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image");
        return;
      }
      if (file.size > 2000000) {
        setError("Please upload an image of size less than 2MB");
        return;
      }
      //@ts-ignore
      setImage(file);
      setImageurl(URL.createObjectURL(file));
      setuploadImage(true);
    }
  };

  const upload = async () => {
    const storage = getStorage(app);
    //@ts-ignore
    const filename = new Date().getTime().toString() + image.name;
    const storageRef = ref(storage, filename);
    //@ts-ignore
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress)
        setloadingcomplete(false);
        setLoading(true);
      },
      (error) => {
        setError("Size should be less than 2Mb");
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageurl(downloadURL);
        setSignup((prev) => ({ ...prev, profilepicture: downloadURL }));
        setLoading(false);
        setloadingcomplete(true);
      }
    );
  };
  return (
    <div className="Form flex flex-col items-center justify-center bg-white gap-2">
      <div className="bg-white">
        <label htmlFor="ProfilePicture" className="bg-white">
          <img
          
            src={
              imageurl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0QxSZCjz-8JefhrJrJwtL5i7utqDsRhv7Q&s"
            }
            alt="profilepicture"
            className="h-20 w-20 object-cover rounded-full border-2 border-black/60 p-1 bg-white "
          />
        </label>
        <input
          accept="image/*"
          type="file"
          placeholder="Choose profile picture"
          className="hidden"
          id="ProfilePicture"
          onChange={HandleImageUpload}
          onClick={() => {
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
          onClick={() => {
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
            setSignup((prev) => ({
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
          onClick={() => {
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
      <div className="flex items-center bg-white gap-2">
        <input
          type="checkbox"
          id="TandC"
          checked={isTandCChecked}
          onChange={(e) => setIsTandCChecked(e.target.checked)}
        />
        <label htmlFor="TandC" className="text-sm bg-white">
          Accept Terms and condition
        </label>
      </div>
      <div className="bg-white">{error && <Alert error={error} />}</div>
      <button
        className="w-[250px] bg-[#8A6FF0] text-white rounded-[50px] py-2 font-bold"
        onSubmit={handleSubmit}
        onClick={handleSubmit}
      >
        Sign up
      </button>
    </div>
  );
}
