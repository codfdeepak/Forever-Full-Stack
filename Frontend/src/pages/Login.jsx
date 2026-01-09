import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 p-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-2xl rounded-2xl p-8 sm:p-12 w-full sm:max-w-md flex flex-col gap-6 relative"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {currentState === "Login" ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-gray-500 mt-2">
            {currentState === "Login"
              ? "Sign in to continue"
              : "Fill the details to sign up"}
          </p>
        </div>

        {/* Name Input for Sign Up */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        )}

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />

        {/* Forgot password & toggle SignUp/Login */}
        <div className="flex justify-between text-sm text-gray-500">
          {currentState === "Login" && (
            <p className="cursor-pointer hover:text-orange-500 transition">
              Forgot your password?
            </p>
          )}
          <p
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
            className="cursor-pointer hover:text-orange-500 transition"
          >
            {currentState === "Login" ? "Create Account" : "Login Here"}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-4 text-xs">
          &copy; 2026 Forever.com. All rights reserved.
        </p>
      </form>
    </div>
  );
};

export default Login;
