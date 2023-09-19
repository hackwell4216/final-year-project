"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import styles from "@/app/LandingPage.module.css";
import { HiUserGroup } from "react-icons/hi";

export default function HomePage() {
    const router = useRouter();

    function handleLogin() {
        router.push('/login');
    }

    function handleSignUp() {
        router.push('/signup');
    }
    return (
        <div className="min-h-screen  w-screen mx-auto bg-center relative  bg-[url('/Image.png')] bg-cover px-28 py-5">
            <Head>

            </Head>

            <div>
                <nav className="flex items-center">
                    <div>
                        <span className="w-40 cursor-pointer text-2xl font-semibold"><HiUserGroup className="inline-block mr-2 text-6xl text-blue-600 group-hover:text-white "/>groupbuy</span>
                    </div>
                    
                <ul className="flex-1 text-center">
                    <li className="list-none inline-block px-5"><a href="#" className="no-underline px-2">Home</a></li>
                    <li className="list-none inline-block px-5"><a href="#" className="no-underline px-2">About</a></li>
                    <li className="list-none inline-block px-5"><a href="#" className="no-underline px-2">Features</a></li>
                    <li className="list-none inline-block px-5"><a href="#" className="no-underline px-2">Contact</a></li>
                </ul>
                <img src="/cart.png" className="w-8 cursor-pointer" alt="cart" />
                </nav>
            </div>

            <div className="mt-48 max-w-xl">
                <h1 className="text-6xl font-semibold leading-normal mb-5">GroupBuy</h1>

                <p className="text-lg">Join our vibrant community of like-minded individuals! Together, we amplify our resources, <span className="">incredible discounts</span> unlock , and pave the way for shared success. 

                <div className="mt-5 font-medium text-blue-600">Embrace the power of unity and start saving while achieving more.</div> 
                </p>
            </div>

            <div className="mt-10 text-4xl">Join us today and let's thrive together!</div>
            <div className="mt-10">
                <a onClick={handleLogin} className="bg-blue-600 rounded-3xl text-white py-3 px-8 font-medium inline-block mr-6 hover:bg-transparent hover:border-blue-600 hover:text-white duration-300 hover:border border border-transparent cursor-pointer">Login</a>
                <a onClick={handleSignUp} className="bg-blue-600 rounded-3xl text-white py-3 px-8 font-medium inline-block ,r-4 hover:bg-transparent hover:border-blue-600 hover:text-white duration-300 hover:border border border-transparent cursor-pointer">Signup</a>
            </div>

           
        </div>
    )
}

