"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Router } from "next/router";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        password: "",
        email: "",
    })

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful");
            router.push("/dashboard");
        } catch (error: any) {
            console.log("Login failed", error.message);
        }
    }

    const onForgotPassword = () => {

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
            >
                {/* left side */}
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold text-blue-700">GroupBuy Hub</span>
                    <span className="font-light text-gray-600 mb-8">
                        Welcom back! Please enter your details
                    </span>
                    <div className="py-4">
                        <span className="mb-2 text-md text-gray-700">Email</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                    </div>
                    <div className="py-4">
                        <span className="mb-2 text-md text-gray-700">Password</span>
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-between w-full py-4">
                       
                        <span className="text-md text-gray-700" onClick={onForgotPassword}>Forgot password?</span>
        
                        
                    </div>
                    <button
                        className="w-full bg-blue-900 text-white p-2 rounded-lg mb-6 hover:bg-blue-500 hover:text-white hover:border hover:border-gray-300"
                        onClick={onLogin}
                    >
                        Sign in
                    </button>
                    
                    <div className="text-center text-gray-500 hover:cursor-pointer ">
                        Don't have an account?
                       <span className="font-bold text-black hover:text-blue-600"> <Link href="/signup">Sign up</Link> </span>
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
        </div>
    )
}