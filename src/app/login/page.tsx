"use client";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Router } from "next/router";

export default function LoginPage(){
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-950">
            <div className="flex flex-col bg-gray-700 p-4 rounded-md shadow-md shadow-gray-500">
                <h1 className="mb-2 text-xl font-bold text-center">Group Buy</h1>
                <h3 className="mb-2 text-xl font-semi-bold text-center">Login</h3>
                <div>
                    <label className="mb-2" htmlFor="username">
                        Email:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2 text-gray-800 text-center border-none rounded-md"
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter your email" 
                            autoComplete="name"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Password:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2  text-gray-800 text-center border-none rounded-md "
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                    </label>
                </div>
                <div>
                    <button 
                        onClick={onLogin}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 flex justify-center"
                        type="submit">Login
                    </button>
                </div>
                <div>
                    <p className="text-white  mt-2">Don't have an account yet? <Link className=" text-blue-500" href="/signup">Create an Acount</Link></p>
                </div>
            </div>
        </div>
    )
}