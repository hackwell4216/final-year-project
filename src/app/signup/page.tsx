"use client";
import Link from "next/link";
import React from "react";
import styles from '../Home.module.css';
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { toast, Toaster } from 'react-hot-toast';


export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        idCard: "",
        email: "",
        password: "",
    })

    const [confirmPassword, setPassword] = React.useState({
        password: ""
    })

    //To check a password between 7 to 15 characters which contain at least one numeric digit and a special character
    function CheckPassword(password: string, confirmPassword: string) {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

        if (password !== confirmPassword) {
            return false;
        }
        else if (confirmPassword.match(paswd)) {
            return true;
        }
    }



    const [loading, setIsLoading] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState('');

    React.useEffect(() => {
        setIsLoading(true);
        setLoadingData("Loading page...please wait");
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);



    const onSignup = async () => {

        try {

            if (user.password === "" ||
                confirmPassword.password === "" ||
                user.email === "" ||
                user.address === "" ||
                user.firstname === "" ||
                user.lastname === "" ||
                user.phone === "") {
                toast.error('Please fill all fields');
            } else {
                if (CheckPassword(user.password, confirmPassword.password)) {
                    setIsLoading(true);
                    setLoadingData('Please wait while your account is being created...');
                    const response = await axios.post("/api/users/signup", user);
                    setIsLoading(false);
                    console.log("Signup success", response.data)
                    toast.success('Your account has been created successfully.');

                    const getToken = await axios.post("/api/users/login", user);

                    toast.success('Check your inbox to verify your account. Thank you!', {
                        style: {
                            border: '1px solid #0000FF',
                            padding: '16px',
                            color: '#000',
                        },
                        iconTheme: {
                            primary: '#1b8a08',
                            secondary: '#FFFFFF',
                        },
                        duration: 30000,
                    });
                    
                    router.push('/login');
                } else {
                    toast.error('Password must be 7 to 15 characters, at least one numeric digit and a special character', {
                        style: {
                            border: '1px solid #FF000',
                            padding: '16px',
                            color: '#000',
                            width: '800px',
                        },
                        iconTheme: {
                            primary: '#FF0000',
                            secondary: '#FFFFFF',
                        },
                        duration: 10000,
                    });
                }
            }


        } catch (error: any) {
            toast.error(error.message);
            console.log("Signup failed", error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {loading ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                    <p className="ml-10 text-center text-blue-600">
                        {loadingData}
                    </p>
                </div>
            ) : (
                <div
                    className="relative flex flex-col m-8 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
                >
                    {/* right side  */}
                    <div className="relative">
                        <img
                            src="/create-account-image.jpg"
                            alt="img"
                            className="w-[650px] h-[500px] hidden mt-24 rounded-r-2xl md:block object-cover"
                        />
                    </div>
                    {/*  left side */}
                    <div className="flex flex-col justify-center p-8 md:p-14 lg:w-2/4">
                        <span className="mb-3 text-4xl font-bold text-blue-700 text-center">GroupBuy Hub</span>
                        <span className="font-light text-gray-600 mb-8">
                            Welcome to GroupBuy Hub. Please provide your details to create your account.
                        </span>
                        <div className="py-2">
                            <span className="mb-2 text-md text-gray-700">First name</span>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                name="phone"
                                id="phone"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />
                        </div>

                        <div className="py-2">
                            <span className="mb-2 text-md text-gray-700">Email</span>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                value={user.password}
                                // pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/"
                                title="Password must be at least 8 characters and contain alphabets, symbols, and numbers."
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                        <div className="py-2">
                            <span className="mb-2 text-md text-gray-700">Confirm Password</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                value={confirmPassword.password}
                                onChange={(e) => setPassword({ ...confirmPassword, password: e.target.value })}
                                // pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/"
                                title="Password must be at least 8 characters and contain alphabets, symbols, and numbers."
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
                    <Toaster />
                </div>
            )}
        </div>
    )
}