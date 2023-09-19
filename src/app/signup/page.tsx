"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast, { Toaster } from 'react-hot-toast';


export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        idCard: "",
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log("Signup failed", error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
            >
                {/* right side  */}
                <div className="relative">
                    <img
                        src="/create-account-image.jpg"
                        alt="img"
                        className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
                    />
                </div>
                {/*  left side */}
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold text-blue-700 text-center">GroupBuy Hub</span>
                    <span className="font-light text-gray-600 mb-8">
                        Welcome to GroupBuy Hub. Please provide your details to create your account.
                    </span>
                    <div className="py-2">
                        <span className="mb-2 text-md text-gray-700">First name</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            name="firstname"
                            id="firstname"
                            value={user.firstname}
                            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                        />
                    </div>

                    <div className="py-2">
                        <span className="mb-2 text-md text-gray-700">Last name</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            name="lastname"
                            id="lastname"
                            value={user.lastname}
                            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                        />
                    </div>

                    <div className="py-2">
                        <span className="mb-2 text-md text-gray-700">Phone</span>
                        <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            name="phone"
                            id="phone"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                    </div>

                    <div className="py-2">
                        <span className="mb-2 text-md text-gray-700">Email</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>

                    <div className="py-2">
                        <span className="mb-2 text-md text-gray-700">Residential digital address</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            name="address"
                            id="address"
                            value={user.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                        />
                    </div>
                    <div className="py-2">
                        <span className="mb-2 text-md text-gray-700">Password</span>
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className="mt-5">
                        <input type="checkbox" className="border border-gray-400 mr-8" /> 
                            <label className="text-gray-700 mr-2">I accept the <a href="#" className="text-blue-800 font-semibold">Terms of Use</a> & <a href="#"
                                    className="text-blue-800 font-semibold">Privacy Policy</a>
                            </label>
                    </div>

                    <button
                        className="w-full bg-blue-900 text-white p-2 rounded-lg mb-6 mt-2 hover:bg-blue-500 hover:text-white hover:border hover:border-gray-300"
                        onClick={onSignup}
                    >
                        Create Account
                    </button>

                    <div className="text-center text-gray-500 hover:cursor-pointer ">
                        Already having an account?
                        <span className="font-bold text-black hover:text-blue-600"> <Link href="/login">Login</Link> </span>
                    </div>
                </div>

            </div>
        </div>
    )
}