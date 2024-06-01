import { isUserAtom } from "@/States/atoms/user-atoms";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
export default function Navbar() {
  const [onfeed, setOnfeed] = useState(false);
  const isuser = useRecoilValue(isUserAtom);

  useEffect(() => {
    if (window.location.pathname === "/feed") {
      setOnfeed(true);
    } else {
      setOnfeed(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
      localStorage.removeItem("recoil-persist");
    } catch (error) {}
  };

  return (
    <div
      className="h-[80px] text-5xl font-bold flex justify-between px-10 items-center allura-regular 
    "
    >
      {isuser && (
        <motion.button
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
          whileTap={{ scale: 0.9 }}
          className="text-xs md:text-sm font-bold roboto-bold  md:right-10 text-white bg-black px-3 py-2 rounded-[50px] hover:bg-black/80"
          onClick={handleLogout}
        >
          Log Out
        </motion.button>
      )}
      <p className="text-5xl md:w-full flex justify-center">Melody</p>
      {onfeed && (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
          whileTap={{ scale: 0.9 }}
          className="text-xs md:text-sm font-bold roboto-bold  md:right-10 text-white bg-black px-3 py-2 rounded-[50px] hover:bg-black/80"
          onClick={() => {
            window.location.href = "/feed/createPost";
          }}
        >
          Create Post
        </motion.button>
      )}
    </div>
  );
}
