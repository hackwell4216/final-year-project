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
        <div className="my-2  p-5 overflow-hidden rounded shadow-lg bg-gray-600 w-96 flex justify-center items-center ml-10">
            <form className="flex flex-col">
                <h1 className="mb-2 text-xl font-bold">Group Buy</h1>
                <h3 className="mb-2 text-xl font-semi-bold">Login</h3>
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
                        onClick={onLogin}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
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