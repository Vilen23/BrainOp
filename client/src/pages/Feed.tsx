import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import throttle from 'lodash/throttle';

interface PostProps {
  author: {
    username: string;
    profilepicture: string;
  };
  title: string;
  content: string;
  picture: string;
}

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const token = getCookie("authToken");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/getPosts`,
        {
          headers: {
            Authorization: `${token}`,
          },
          params: { page, limit: 10 },
        }
      );
      if (response.status === 200) {
        const fetchedPosts = response.data.posts;
        // If the fetched posts are less than the limit, we know we've hit the end
        if (fetchedPosts.length < 10) {
          // Reset page to 1 to create a looping effect
          setPage(1);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(throttle(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 200 && !loading) {
      fetchPosts(page);
    }
  }, 200), [loading, page]);

  useEffect(() => {
    fetchPosts(page);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="flex justify-center w-[100vw]">
      <div className="flex flex-col items-center justify-center bg-white p-10 min-h-screen gap-10">
        {posts.map((post, index) => (
          <Card
            key={index}
            author={post.author}
            title={post.title}
            content={post.content}
            picture={post.picture}
          />
        ))}
        {loading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
}

const Card = ({ author, title, content, picture }: PostProps) => {
  return (
    <div className="card bg-white flex flex-col items-center gap-4 border-b-1">
      <div className="card-header flex items-center bg-white gap-2  w-full">
        <img
          src={
            author.profilepicture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0QxSZCjz-8JefhrJrJwtL5i7utqDsRhv7Q&s"
          }
          alt="profile"
          className="bg-white h-[30px] w-[30px] rounded-full border-[2px] border-black"
        />
        <h3 className="bg-white font-bold text-black/70 line-clamp-1">
          {author.username}
        </h3>
      </div>
      <h2 className="bg-white w-full font-bold text-xl capitalize">{title}</h2>
      <img
        className="bg-white border-[3px] border-black w-[400px]"
        src={picture}
        alt="post"
      />
      <div className="card-body bg-white w-full">
        <p className="bg-white w-full text-md px-2 text-gray-700">{content}</p>
      </div>
    </div>
  );
};
