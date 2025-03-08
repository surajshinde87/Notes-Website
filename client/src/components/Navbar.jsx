import React from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = ({userInfo}) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between px-6 py-2 drop-shadow bg-white ">
      <h2 className="text-xl text-black font-medium py-2">EverWrite</h2>
      {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};

export default Navbar;
