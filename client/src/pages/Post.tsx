import { useEffect } from "react";
import CreatePost from "../components/CreatePost";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();

  const verifyUser = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/verify`,{withCredentials:true});
      if(response.status === 200){
        navigate('/feed/createPost');
      }
    } catch (error) {
      navigate('/');
      console.log(error);
      return;
    }
  }

  useEffect(()=>{
    try {
      verifyUser();
    } catch (error) {
      console.log(error);
      return ;
    }
  },[])
  return (
    <div>
        <CreatePost/>
    </div>
  )
}
