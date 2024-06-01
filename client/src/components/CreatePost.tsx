import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../lib/firebase";
import Alert from "./ui/Alert";
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
  const [image, setImage] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [uploadImage, setuploadImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingcomplete, setloadingcomplete] = useState(false);

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
        window.location.href = "/feed";
      }
    } catch (error) {
      console.log(error);
      setLoadingPublish(false);
      //@ts-ignore
      setError(error.response?.data?.error || "An error occurred");
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
        console.log(imageurl)
        setPost((prev) => ({ ...prev, picture: downloadURL }));
        setLoading(false);
        setloadingcomplete(true);
      }
    );
  };
  return (
    <div className="flex justify-center pt-[20px] font-roboto">
      <div className="md:w-[600px] w-[90vw] flex flex-col items-center">
        <h1 className="font-extrabold text-4xl my-2 roboto-bold">
          Create Post
        </h1>
        {error && <Alert error={error} />}
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
            {loadingPublish ? "Publishing" : "Publish"}
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
            onClick={() => {
              setuploadImage(true);
            }}
          >
            {loading ? "Uploading" : loadingcomplete ? "Uploaded" : "Upload"}
          </motion.button>
          <Input
            onChange={HandleImageUpload}
            id="picture"
            type="file"
            className="border-[3px] p-2 border-[#AE9DF6]"
            accept="image/*"
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
