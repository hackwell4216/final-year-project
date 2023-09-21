"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../Home.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    password: "",
    email: "",
  });

  const [loading, setIsLoading] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);
    setLoadingData("Loading page...please wait");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      setLoadingData("Logging you in...");
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/dashboard"); 
      setIsLoading(false);
      toast.success("Login successful");
    } catch (error: any) {
      toast.error("Email or Password might be incorrect. Refresh page and try again.");
      console.log("Login failed", error.message);
    }
  };

  const onForgotPassword = () => {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p className="ml-10 text-center text-blue-600 text-lg">
            {loadingData}
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* left side */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-blue-700">
              GroupBuy Hub
            </span>
            <span className="font-light text-gray-600 mb-8">
              Welcom back! Please enter your details
            </span>
            <div className="py-4">
              <span className="mb-2 text-md text-gray-700">Email</span>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                pattern="^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+[\]{}|;:'"
                title="Password must be at least 8 characters and contain alphabets, symbols, and numbers."
                aria-required
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <span
                className="text-md text-gray-700"
                onClick={onForgotPassword}
              >
                Forgot password?
              </span>
            </div>
            <button
              className="w-full bg-blue-900 text-white p-2 rounded-lg mb-6 hover:bg-blue-500 hover:text-white hover:border hover:border-gray-300"
              onClick={onLogin}
            >
              Sign in
            </button>

            <div className="text-center text-gray-500 hover:cursor-pointer ">
              Don't have an account?
              <span className="font-bold text-black hover:text-blue-600">
                {" "}
                <Link href="/signup">Sign up</Link>{" "}
              </span>
            </div>
          </div>
          {/* right side */}
          <div className="relative">
            <img
              src="/joined_hands.jpg"
              alt="img"
              className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      )}
      ;
      <Toaster />
    </div>
  );
}
