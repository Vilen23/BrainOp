
export default function Signupcomp() {
  return (
    <div className="Form flex flex-col items-center justify-center bg-white gap-4">
      <div className="bg-white">
        <label htmlFor="ProfilePicture" className="bg-white">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0QxSZCjz-8JefhrJrJwtL5i7utqDsRhv7Q&s"
            alt="profilepicture"
            className="h-20 rounded-full border-2 border-black/60 p-1 bg-white "
          />
        </label>
        <input
          type="file"
          placeholder="Choose profile picture"
          className=" hidden"
          id="ProfilePicture"
        />
      </div>
      <div className="bg-white flex flex-col">
        <label htmlFor="username" className="bg-white text-sm px-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Should be unique"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
        />
      </div>
      <div className="bg-white flex flex-col">
        <label htmlFor="password" className="bg-white text-sm px-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Should be 8 letters"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
        />
      </div>
      <div className="bg-white flex flex-col">
        <label htmlFor="confirmpassword" className="bg-white text-sm px-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirm your password"
          className="bg-white px-2.5 py-2 border-[1px] border-[#DDD5FE] focus:outline-[#8A6FF0] text-xs w-[250px] rounded-[50px]"
        />
      </div>
      <button className="w-[250px] bg-[#8A6FF0] text-white rounded-[50px] py-2 font-bold">Sign up</button>
    </div>
  );
}
