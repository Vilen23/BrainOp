import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
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

export const userAtom = atom({
    key:"userAtom",
    default:{
        username:"",
        profilepicture:"",
        name:""
    },
    effects_UNSTABLE: [persistAtom]
})

export const isUserAtom = atom({
    key:"isUserAtom",
    default:false
})