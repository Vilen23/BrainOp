import SigninForm from '../Components/SigninForm'

export default function Home() {
  return (
    <div className='flex px-20 justify-center  items-center'>
        <div className='bg-white w-[90vw] h-[80vh] rounded-[50px] grid grid-cols-2 place-items-center'>
            <div className='bg-white'><SigninForm/></div>
            <div className='bg-white flex flex-col items-center relative'>
                <h1 className='bg-white text-[90px] font-bold font-roboto'>LOGIN</h1>
                <p className='bg-white text-sm font-roboto font-light text-gray-700 absolute bottom-0'>Dive Deep into the melody you cant forget!</p>
            </div>
        </div>
    </div>
  )
}
