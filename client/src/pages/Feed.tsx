import  { useEffect } from 'react'

export default function Feed() {
    const getCookie = (name:string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };

    const checkUser = async()=>{
        try {
            const token = getCookie("authToken");
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        checkUser()
    },[])
  return (
    <div>Feed</div>
  )
}
