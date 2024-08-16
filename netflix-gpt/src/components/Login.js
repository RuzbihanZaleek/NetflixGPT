import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

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
      <form className="absolute p-12 bg-black bg-opacity-85 w-1/4 my-36 mx-auto left-0 right-0 text-white rounded-lg">
        <h1 className="font-bold text-3xl py-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full rounded-sm bg-slate-800 bg-opacity-50 border"
          />
        )}
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-3 w-full rounded-sm bg-slate-800 bg-opacity-50 border"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full rounded-sm bg-slate-800 bg-opacity-50 border"
        />
        <button className="p-2 my-2 bg-red-700 font-bold rounded-md w-full">
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
