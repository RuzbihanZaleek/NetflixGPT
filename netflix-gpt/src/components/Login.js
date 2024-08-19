import React, { useRef, useState } from "react";
import Header from "./Header";
import { validData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const SignUpPrompt = ({ onClick }) => (
    <>
      New to Netflix?{" "}
      <span
        className="font-bold text-white hover:underline cursor-pointer"
        onClick={onClick}
      >
        Sign up now.
      </span>
    </>
  );

  const SignInPrompt = ({ onClick }) => (
    <>
      Already registered.{" "}
      <span
        className="font-bold text-white hover:underline cursor-pointer"
        onClick={onClick}
      >
        Sign in now.
      </span>
    </>
  );

  const handleButtonClick = () => {
    // Validate form data
    const message = validData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign in / Sign up
    if (isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/78161633?v=4",
          })
            .then(() => {
              const { uid, email, fullName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  fullName: fullName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg-img"
        />
      </div>

      {/* Login Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black bg-opacity-85 w-1/4 my-36 mx-auto left-0 right-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-4 my-3 w-full rounded-sm bg-slate-800 bg-opacity-50 border"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email or mobile number"
          className="p-4 my-3 w-full rounded-sm bg-slate-800 bg-opacity-50 border"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-3 w-full rounded-sm bg-slate-800 bg-opacity-50 border"
        />
        <p className="text-lg text-red-600 font-bold my-2">{errorMessage}</p>
        <button
          className="p-2 my-2 bg-red-700 font-bold rounded-md w-full"
          onClick={handleButtonClick}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <div className="flex w-full justify-center my-2">OR</div>
        <button className="p-2 my-2 bg-gray-600 bg-opacity-50 font-bold rounded-md w-full">
          Use a Sign-In Code
        </button>
        <div className="flex w-full justify-center my-2">Forgot password?</div>
        <div className="flex gap-2 my-4">
          <input type="checkbox" className="w-4" />
          <p>Remember me</p>
        </div>
        <div className="my-4 text-slate-400">
          {isSignUp ? (
            <SignInPrompt onClick={handleSignUp} />
          ) : (
            <SignUpPrompt onClick={handleSignUp} />
          )}
        </div>
        <div className="my-6 text-slate-400 text-xs">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-600">Learn more.</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
