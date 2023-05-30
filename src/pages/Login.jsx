import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const dispatch = useDispatch();

  const loginUser = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            user: result.user.displayName,
          })
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center space-y-10 max-w-[1500px] mx-auto">
      <BsTwitter className="text-white w-20 h-20" />
      <div>
        <button
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
          onClick={loginUser}
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            Sign In with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
