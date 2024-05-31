import { useRecoilState } from "recoil";
import { signupAtom } from "../atoms/user-atoms";

const useSignup = (value:any, setValue:any) => {
    const [signupState, setSignupState] = useRecoilState(signupAtom);

    const updateSignupState = (key:any, newValue:any) => {
        setSignupState((prevState) => ({
            ...prevState,
            [key]: newValue,
        }));
    };
;
    const handleChange = (key:any) => (e:any) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateSignupState(key, newValue);
    };

    return {
        signupState,
        handleChange,
    };
};

export default useSignup;
