"use client";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios, { Axios } from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage(){

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            toast.success('User successfully created!');
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log("Signup failed", error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-950">
            <form className="flex flex-col bg-gray-700 p-4 rounded-md shadow-md shadow-gray-500" method="get">
                <h1 className="mb-2 text-xl font-bold text-center">Group Buy</h1>
                <h3 className="mb-2 text-xl font-semi-bold text-center">Create your Account</h3>
                <div>
                    <label className="mb-2" htmlFor="username">
                        Username:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2 text-black"
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter your username" 
                            autoComplete="name"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Email:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2 text-black"
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email here" 
                            autoComplete="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Password:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2 text-black"
                            type="password" 
                            name="password" 
                            id="password" 
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                    </label>
                </div>
                <div>
                    <button 
                        onClick={onSignup}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 flex items-stretch"
                        type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}