import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import axios from "axios";

interface CreatePostProps {
  title: string;
  picture: string;
  content: string;
}

export default function CreatePost() {
  const [post, setPost] = useState<CreatePostProps>({
    title: "",
    picture: "",
    content: "",
  });
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [error, setError] = useState("");

  const handlePublish = async () => {
    try {
      setLoadingPublish(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/createPost`,
        post
      );
      if (response.status === 201) {
        setLoadingPublish(false);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setLoadingPublish(false);
      //@ts-ignore
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center pt-[20px] font-roboto">
      <div className="md:w-[600px] w-[90vw] flex flex-col items-center">
        <h1 className="font-extrabold text-4xl my-2 roboto-bold">
          Create Post
        </h1>
        <div className="flex w-full my-2 gap-2">
          <input
            onChange={(e) =>
              setPost((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
            placeholder="Title"
            className="w-full bg-white text-black p-2 border-4 border-[#AE9DF6]
                focus:outline-none focus:border-[#8A6FF0] focus:ring-0  rounded-[10px]"
          />
          <motion.button
            onClick={handlePublish}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="bg-[#8A6FF0] px-4 py-2 rounded-[10px] font-bold text-white "
          >
            Publish
          </motion.button>
        </div>
        <div className="flex w-full mb-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="bg-[#8A6FF0] px-4 py-2 rounded-[10px] font-bold text-white "
          >
            Upload
          </motion.button>
          <Input
            onChange={(e) =>
              setPost((prev) => ({ ...prev, picture: e.target.value }))
            }
            id="picture"
            type="file"
            className="border-[3px] p-2 border-[#AE9DF6]"
          />
        </div>
        <div className="w-full">
          <Textarea
            onChange={(e) =>
              setPost((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Type your message here."
            className="w-full bg-white text-black p-2 border-4 border-[#AE9DF6]
                focus:outline-none focus:border-[#8A6FF0] focus:ring-0 outline-none ring-0  rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
}
