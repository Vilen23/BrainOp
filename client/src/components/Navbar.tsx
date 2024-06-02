import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Navbar() {
  const [onfeed, setOnfeed] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/feed") {
      setOnfeed(true);
    } else {
      setOnfeed(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`); // Assuming your backend is on the same domain
      localStorage.removeItem("recoil-persist");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className="h-[80px] text-5xl font-bold flex justify-between px-10 items-center allura-regular 
    "
    >
      {onfeed && (
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
      <p
        className={`${
          onfeed ? "w-fit" : "w-fullr"
        } text-5xl flex justify-center`}
      >
        Melody
      </p>
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
