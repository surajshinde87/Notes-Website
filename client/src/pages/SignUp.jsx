import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");
    try {
      const responce = await axiosInstance.post("/api/auth/register", {
        fullName: name  ,
        email,
        password,
      });
      if (responce.data && responce.data.error) {
        setError(responce.data.message)
        return false
      }
      if (responce.data && responce.data.accessToken) {
        localStorage.setItem("accessToken", responce.data.accessToken);
        navigate("/dashboard")
      }

    } catch (error) {
      if (
        error.response.data.message &&
        error.response &&
        error.response.data
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to SignUp");
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-20 ">
        <div className="w-96 border rounded px-7 py-10 bg-white border-slate-200">
          <form action="" onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4 ">
              Already have an account?
              <Link to="/login" className="font-medium text-blue-600 underline">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
