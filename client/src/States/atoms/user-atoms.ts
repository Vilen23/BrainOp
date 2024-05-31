import { atom } from "recoil";

export const signupAtom = atom({
    key:"signupAtom",
    default:{
        username:"",
        password:"",
        confirmpassword:"",
        profilepicture:"",
        name:""
    }
})