import { useEffect } from 'react'
import SigninForm from '../components/SigninForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isUserAtom } from '@/States/atoms/user-atoms';

export default function Home() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(isUserAtom);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };
  const token = getCookie("authToken");
  
  const verifyUser = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/verify`,{headers:{'Authorization':`${token}`}});
      if(response.status === 200){
        setUser(true);
        window.location.href = '/feed';
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
    <div className='flex md:px-20 justify-center  items-center'>
        <div className='bg-white w-[90vw] py-10 md:py-0 md:h-[80vh] rounded-[50px] grid grid-cols- md:grid-cols-2 place-items-center'>
            <div className='bg-white'><SigninForm/></div>
            <div className='bg-white hidden flex-col items-center relative md:flex'>
                <h1 className='bg-white text-[90px] font-bold font-roboto'>LOGIN</h1>
                <p className='bg-white text-sm font-roboto font-light text-gray-700 absolute bottom-0'>Dive Deep into the melody you cant forget!</p>
            </div>
        </div>
    </div>
  )
}
