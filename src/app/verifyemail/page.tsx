"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { HiUserGroup } from "react-icons/hi";
import { useRouter } from "next/navigation";
import styles from '../Home.module.css';



export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const [user, setUser] = React.useState({
        firstname: "",
    });

    const router = useRouter();

    const [loading, setIsLoading] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState('');

    React.useEffect(() => {
        setIsLoading(true);
        setLoadingData("Loading page...please wait");
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);


    const getUserDetails = async () => {
        try {

            
            const response = await axios.get("/api/users/getUserData");
            
            const updateUserDetails = {
                ...user,
                firstname: response.data.data.firstname,

            };

            setUser(updateUserDetails);

        } catch (error: any) {
            toast.error("Error fetching user details");
            console.log("Error fetching user details: ", error);
        }
    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || ""); 
        
    }, []);

    useEffect(() => {
        getUserDetails();
        
    });


    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                await axios.post('/api/users/verifyemail', { token })
                setVerified(true);
    
            } catch (error) {
                setError(true);
                console.log(error);
    
            }
    
        }

        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    function activateAccount() {
       
            toast.success('Success! Your account is activated.');
            router.push('/login');
         
    }

    return (
        <div className="min-h-screen py-2 bg-gray-800">
            {loading ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                    <p className="ml-10 text-center text-blue-600">
                        {loadingData}
                    </p>
                </div>
            ) : (
                <>
                    <div>
                        <span className="w-40 text-2xl font-semibold ml-12 mt-10"><HiUserGroup className="inline-block mr-2 text-6xl text-blue-600 group-hover:text-white " />groupbuy</span>
                    </div>
                    <div className="bg-blue-100 rounded-md lg:m-64 h-80 p-6 md:p-3 md:w-[800px] md:mx-auto md:mt-20">
                        <p className="text-gray-600 text-2xl ml-20">One more step!</p>
                        <p className="text-gray-600 text-2xl ml-20 mb-10">{'Let\'s verify your email address.'}</p>
                        <p className="text-gray-600 text-xl ml-20">{`${user.firstname}, to activate your account, simply click on the verification link below.`}</p>

                        <div onClick={activateAccount} className="bg-blue-600 w-56 text-center p-4 mx-auto rounded-md font-normal cursor-pointer mt-10">Activate My Account</div>

                    </div>
                </>
            )}
            <Toaster />
        </div>
    )

}