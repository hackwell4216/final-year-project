"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from '../Home.module.css';

function UserProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setIsLoading] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);
    setLoadingData("Loading profile page...please wait");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Handle password reset logic here
  };

  const getUserDetails = async () => {
    try {
      
      const res = await axios.get("/api/users/getUserData");
     

      // console.log(res.data);
     
      const updateUserDetails = {
        ...user,
        firstname: res.data.data.firstname,
        lastname: res.data.data.lastname,
        phone: res.data.data.phone,
        address: res.data.data.address,
        email: res.data.data.email,
      };
      
      setUser(updateUserDetails);

    } catch (error: any) {
      toast.error("Error fetching user details");
      console.log("Error fetching user details: ", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  })

  return (
    <div className="min-h-screen  w-screen mx-auto bg-center relative  bg-[url('/Image.png')] bg-cover px-28 py-5">
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p className="ml-10 text-center text-blue-600 text-lg">
            {loadingData}
          </p>
        </div>
      ) : (
        <div className="max-w-md mx-auto border border-white rounded-md p-6 mt-10">
          <div className="text-center">
            <img
              src="/grocery-image.png" // Replace with the actual path to the profile picture
              alt="Profile Picture"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h1 className=" text-left border border-b-white border-t-0 border-l-0 border-r-0 border-b-2 mt-5 mb-3 text-lg">
              Personal Information
            </h1>

            <p className="text-sm mb-5 text-left">
              <span className="mr-24">First name:</span> {user.firstname}
            </p>
            <p className="text-sm mb-5 text-left">
              <span className="mr-24">Last name:</span> {user.lastname}
            </p>
            <p className="text-sm mb-5 text-left">
              <span className="mr-24">Email:</span> {user.email}
            </p>
            <p className="text-sm mb-5 text-left">
              <span className="mr-[100px]">Phone: </span>
              {user.phone}
            </p>
            <p className="text-sm mb-5 text-left">
              <span className="mr-24">Address: </span>
              {user.address}
            </p>
            <p className="text-sm mb-5 text-left">
              <span className="mr-10">Account Balance:</span> $1000.00
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-left border border-b-white border-t-0 border-l-0 border-r-0 border-b-2 mt-5 mb-3 text-lg">
              Password Reset
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full px-3 py-2 rounded-lg border-gray-300"
                  placeholder="Old password"
                  value={newPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-3 py-2 rounded-lg border-gray-300"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 rounded-lg border-gray-300"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
              )}
              <button
                type="submit"
                className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
              >
                Reset Password
              </button>
            </form>
          </div>

          <div className="mt-6">
            <h2 className="text-left border border-b-white border-t-0 border-l-0 border-r-0 border-b-2 mt-5 mb-3 text-lg">
              App Peferences
            </h2>
            <div className="flex items-center justify-between">
              <label className="text-sm">Dark Mode</label>
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
