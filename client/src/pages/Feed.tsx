import axios from 'axios';
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Feed() {
    const navigate  = useNavigate();


    const getCookie = (name:string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };

    const checkUser = async()=>{
        try {
            const token = getCookie("authToken");
            if(!token){
                navigate("/")
                return;
            }
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/getPosts`,{
                headers:{
                    Authorization: `${token}`
                }
            })
            if(response.status === 200){
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
            navigate("/");
            return;
        }
    }
    useEffect(()=>{
        checkUser()
    },[])
  return (
    <div>Feed</div>
  )
}
