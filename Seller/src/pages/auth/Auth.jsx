import React, { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { authUrl, url } from "../../Api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../store/slice/user.slice";

function Auth() {
  const handleGoogleLogin = async (e) => {
    window.location.href = `${url}/auth/google`;
    e.preventDefault();
    await authUrl.get("/google");
  };

  const handleGithubLogin = async (e) => {
    e.preventDefault();
    window.location.href = `${url}/auth/github`;
    await authUrl.get("/github");
  };

  const wantToSeller = (e) => {
    e.preventDefault();
    console.log("Want seller");
  };

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUser());
      if (isAuthenticated) {
        navigate("/");
      }
    }, 500);
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex font-serif">
      <form className="flex gap-4 flex-col items-center justify-center p-6">
        <div className="flex items-center gap-3 w-full text-3xl font-bold tracking-[2px] p-1">
          <img
            src="logo.png"
            alt="logo"
            className="h-10 shadow-[0px_0px_2px_2px]"
          />
          <h1>ShopCart</h1>
        </div>
        <h1 className="w-full text-2xl">Welcome Back Seller</h1>
        <h1 className="text-2xl">Login/ Register into your Account</h1>
        <button
          className="hover:shadow-[0px_0px_3px_3px] active:shadow-[0px_0px_3px_3px] shadow-white w-full p-2 rounded-full flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-white via-red-400 to-blue-700 text-black cursor-pointer"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon /> Google
        </button>
        <button
          className="hover:shadow-[0px_0px_3px_3px] active:shadow-[0px_0px_3px_3px] shadow-white w-full p-2 rounded-full flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-white via-red-400 to-blue-700 text-black cursor-pointer"
          onClick={handleGithubLogin}
        >
          <GitHubIcon /> GitHub
        </button>
        <Link
          className="underline cursor-pointer active:text-blue-600 w-full text-end px-2"
          to={"/want-seller"}
        >
          Want to be seller
        </Link>
      </form>
      <div className="">
        {/* <img src="logo.png" alt="demo" className="w-full h-full object-cover"/> */}
      </div>
    </div>
  );
}

export default Auth;
