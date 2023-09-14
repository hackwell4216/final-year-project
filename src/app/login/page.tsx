"use client";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage(){
    const [user, setUser] = React.useState({
        password: "",
        username: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-950">
            <form className="flex flex-col bg-gray-700 p-4 rounded-md shadow-md shadow-gray-500">
                <h1 className="mb-2 text-xl font-bold text-center">Group Buy</h1>
                <h3 className="mb-2 text-xl font-semi-bold text-center">Login</h3>
                <div>
                    <label className="mb-2" htmlFor="username">
                        Username:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2 text-gray-800 text-center border-none rounded-md"
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
                        Password:
                        <input 
                            className="mb-4 py-2 w-80 ml-4 border-b-2  text-gray-800 text-center border-none rounded-md "
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
                        onClick={onLogin}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 flex justify-center"
                        type="submit">Login
                    </button>
                </div>
                <div>
                    <p className="text-white  mt-2">Don't have an account yet? <Link className=" text-blue-500" href="/signup">Create an Acount</Link></p>
                </div>
            </form>
        </div>
    )
}