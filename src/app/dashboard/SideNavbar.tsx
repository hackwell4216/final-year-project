"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { BiMessageSquareDots } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function SideNavbar() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            console.log('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className="absolute top-20 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-violet-800 hover:border hover:border-violet-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <GiHamburgerMenu className="h-6 w-10 " aria-hidden="false" />
                </Disclosure.Button>
                <div className="p-6 w-1/2 h-screen bg-violet-200 z-20 fixed top-0 -left-96 lg:left-0 lg:w-80 md:w-auto peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start item-center">
                        <h1 className="text-base text-center cursor-pointer font-bold text-violet-900 border-b border-violet-100 pb-4 w-full">
                            Dashboard
                        </h1>
                        <div className=" my-4 border-b border-violet-100 pb-4">


                            <Link href="/profile">
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:border hover:border-violet-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <CgProfile className="text-2xl text-violet-600  " />

                                    <h3 className="text-base text-violet-800  font-semibold ">
                                        Profile
                                    </h3>

                                </div>
                            </Link>

                            <Link href="/CreateGroupBuyForm">
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:border hover:border-violet-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

                                    <HiUserGroup className="text-2xl text-violet-600 " />
                                    <h3 className="text-base text-violet-800  font-semibold ">
                                        Create Group
                                    </h3>

                                </div>
                            </Link>

                        </div>
                        {/* setting  */}
                        <div className=" my-4 border-b border-violet-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:border hover:border-violet-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineSettings className="text-2xl text-violet-600  " />
                                <h3 className="text-base text-violet-800  font-semibold ">
                                    Settings
                                </h3>
                            </div>
                        </div>
                        {/* logout */}
                        <div className=" my-4 border">
                            <div onClick={logout} className="flex mb-2 justify-start items-center gap-4 pl-5 hover:border hover:border-violet-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineLogout className="text-2xl text-violet-600  " />
                                <h3 className="text-base  text-violet-800  font-semibold ">
                                    Logout
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

export default SideNavbar;