"use client"
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { IoWalletSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";

// Import your custom components
import LoadingModal from "@/app/components/LoadingModal/page";
import GroupBuyList from "@/app/components/GroupBuyList/page";
import CreateGroupBuyForm from "@/app/components/CreateGroupBuyForm/page";

// ... ABIs and type definition imports ...
import GroupBuyABI from "@/app/utils/groupBuy.json";
import GroupBuyManagerABI from "@/app/utils/groupBuyManager.json";
import USDCABI from "@/app/utils/usdcContract.json";

type GroupBuys = {
    endTime: number;
    price: string; //check
    seller: string; //address
    groupBuyState: number;
    productName: string;
    productDescription: string;
    groupBuyAddress: string; //each group buy has its own contract
    buyers: string[]; //list of buyers
};

export default function Home() {
    // State and variables
    const originalUsdcContract = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    const groupBuyManagerContract = "0x4cfA29dB49f6A73e35E199B66d55B89dcbCa6e28";

    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
    const [allGroupBuys, setAllGroupBuys] = useState<GroupBuys[]>([]);
    const [activeGroupBuy, setGroupBuyToActive] = useState<GroupBuys | null>(null);

    // whether or not to show the loading dialog
    const [isLoading, setIsLoading] = useState(false);

    // text data to display on loading dialog
    const [loadedData, setLoadedData] = useState("Loading...");

    //variables
    const [createGroupBuyFields, setGroupBuyFields] = useState({
        endTime: 0,
        price: 0,
        productName: "",
        productDescription: "",
    });


    // Functions...


    function openModal() {
        setIsLoading(true);
    }

    function closeModal() {
        setIsLoading(false);
    }

    //functions
    async function getAllGroupBuys() {
        const { ethereum } = window;

        // Check if MetaMask is installed
        if (!ethereum) {
            return "Make sure you have MetaMask Connected!";
        }

        // Get user Metamask Ethereum wallet address
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        // Get the first account address
        const walletAddr = accounts[0];
        //set to variable to store current wallet address
        setCurrentWalletAddress(walletAddr);

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            // Create a contract instance of your deployed GroupBuy Manager contract
            // 1) add code here
            const groupBuyContractManager = new ethers.Contract(
                groupBuyManagerContract,
                GroupBuyManagerABI,
                signer
            );

            // call the getGroupBuys function from the contract to get all addresses
            // 2) add code here
            const groupBuysAddresses = await groupBuyContractManager.getGroupBuys();

            // call getGroupBuyInfo function from contract
            // 3) add code here
            const groupBuys = await groupBuyContractManager.getGroupBuyInfo(
                groupBuysAddresses
            );

            // declare new array
            let new_groupBuys = [];

            // loop through array and add it into a new array
            for (let i = 0; i < groupBuys.endTime.length; i++) {
                let endTime: number = groupBuys.endTime[i].toNumber();
                let groupBuyState: number = groupBuys.groupBuyState[i].toNumber();

                let price = groupBuys.price[i]; //
                let productName: string = groupBuys.productName[i];
                let productDescription: string = groupBuys.productDescription[i];

                let sellerAddress: string = groupBuys.seller[i];

                let newGroupBuy = {
                    endTime: endTime,
                    price: (price / 1000000).toString(),
                    seller: sellerAddress.toLowerCase(),
                    groupBuyState: groupBuyState,
                    productName: productName,
                    productDescription: productDescription,
                    groupBuyAddress: groupBuysAddresses[i],
                    buyers: [],
                };
                new_groupBuys.push(newGroupBuy);
            }
            // set to variable
            setAllGroupBuys(new_groupBuys);
        }
    }

    async function createGroupBuy() {
        try {
            //check if required fields are empty
            if (
                !createGroupBuyFields.price ||
                !createGroupBuyFields.endTime ||
                !createGroupBuyFields.productName ||
                !createGroupBuyFields.productDescription
            ) {
                return alert("Fill all the fields");
            }

            //check if fields meet requirements
            if (createGroupBuyFields.price < 0) {
                return alert("Price must be more than 0");
            }

            if (createGroupBuyFields.endTime < 5) {
                return alert("Duration must be more than 5 mins");
            }

            //call create groupbuy function from the contract
            const { ethereum } = window;

            if (ethereum) {
                //set loading modal to open and loading modal text
                setLoadedData("Creating group buy...Please wait");
                openModal();

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                //create contract instance
                const groupBuyContractManager = new ethers.Contract(
                    groupBuyManagerContract,
                    GroupBuyManagerABI,
                    signer
                );

                // call create groupbuy function from the contract
                // 1) add code here
                let { hash } = await groupBuyContractManager.createGroupbuy(
                    createGroupBuyFields.endTime * 60, // Converting minutes to seconds
                    ethers.utils.parseUnits(createGroupBuyFields.price.toString(), 6),
                    createGroupBuyFields.productName,
                    createGroupBuyFields.productDescription,
                    {
                        gasLimit: 1200000,
                    }
                );

                //wait for transaction to be mined
                await provider.waitForTransaction(hash);

                //close modal
                closeModal();

                //display alert message
                alert(`Transaction sent! Hash: ${hash}`);

                //call allGroupbuys to refresh the current list
                await getAllGroupBuys();

                //reset fields back to default values
                setGroupBuyFields({
                    endTime: 0,
                    price: 0,
                    productName: "",
                    productDescription: "",
                });
            }
        } catch (error) {
            console.log(error);
            closeModal();
            alert(`Error: ${error}`);
            return `${error}`;
        }
    }

    async function setActiveGroupBuy(groupBuy: GroupBuys) {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            //create contract instance
            const groupBuyContract = new ethers.Contract(
                groupBuy.groupBuyAddress,
                GroupBuyABI,
                signer
            );

            //get all current buyers(address)
            let allCurrentBuyers = await groupBuyContract.getAllOrders();

            //set current group buy to active and update the buyers field
            setGroupBuyToActive({
                ...groupBuy,
                buyers: allCurrentBuyers,
            });
        }
    }

    async function placeOrder(currentActiveGroupBuy: GroupBuys | null) {
        try {
            const { ethereum } = window;

            if (ethereum) {
                // check if the active group buy is null
                if (currentActiveGroupBuy == null) {
                    return;
                }
                //open loading modal and set loading text
                setLoadedData("Getting approval...please wait");
                openModal();

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                // create USDC contract instance
                const usdcContract = new ethers.Contract(
                    originalUsdcContract,
                    USDCABI,
                    signer
                );

                // call approval function to give permission to transfer USDC from user wallet to groupbuy smart contract
                const usdcApprovalTxn = await usdcContract.approve(
                    currentActiveGroupBuy.groupBuyAddress,
                    ethers.utils.parseUnits("1000", 6)
                );

                // wait for transaction to be mined
                // 2) add code here
                await usdcApprovalTxn.wait();

                closeModal();

                //after giving approval we will palce our order here
                setLoadedData("Placing Order...please wait");
                openModal();

                // create groupBuy contract instance
                const groupBuyContract = new ethers.Contract(
                    currentActiveGroupBuy.groupBuyAddress,
                    GroupBuyABI,
                    signer
                );

                // call place order function from group buy contract
                // 3) add code here
                let { hash } = await groupBuyContract.placeOrder({
                    gasLimit: 700000,
                });


                // Wait till the transaction is mined
                // 4) add code here
                await provider.waitForTransaction(hash);

                closeModal();

                // display alert mesaage
                // 5) add code here

                //get updated buyers
                //get all current buyers(address) and price(same for all)
                let allCurrentBuyers = await groupBuyContract.getAllOrders();

                //set current group buy to active
                setGroupBuyToActive({
                    ...currentActiveGroupBuy,
                    buyers: allCurrentBuyers,
                });
            }
        } catch (error) {
            closeModal();
            alert(`Error: ${error}`);
            return `${error}`;
        }
    }

    async function withdrawFunds(currentActiveGroupBuy: GroupBuys | null) {
        try {
            const { ethereum } = window;

            if (ethereum) {
                if (currentActiveGroupBuy == null) {
                    return;
                }

                // open modal and set loading text
                setLoadedData("Withdrawing funds...Please wait");
                openModal();

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                //create groupBuy contract instance
                const groupBuyContract = new ethers.Contract(
                    currentActiveGroupBuy.groupBuyAddress,
                    GroupBuyABI,
                    signer
                );

                //call withdraw funds function from group buy contract
                // 1) add code here
                let { hash } = await groupBuyContract.withdrawFunds();
                // Wait till the transaction is mined
                // 2) add code here
                await provider.waitForTransaction(hash);
                setIsLoading(false);
                closeModal();
                // display slert message
                // 3) add code here
                alert(`Transaction sent! Hash: ${hash}`);
            }
        } catch (error) {
            console.log(error);
            closeModal();
            alert(`Error: ${error}`);
            return `${error}`;
        }
    }

    //render functions
    function renderGroupBuys(groupBuy: GroupBuys) {
        let state = "";
        if (groupBuy.groupBuyState === 0) {
            state = "Open";
        }
        if (groupBuy.groupBuyState === 1) {
            state = "Ended";
        }

        return (
            <div className="px-10 py-10 rounded-md mt-10 bg-slate-300 shadow-md shadow-slate-500">
                <p className="py-1">
                    <span className="font-bold mr-[70px]">Product Name: </span>{groupBuy.productName}
                </p>
                <p className="py-1">
                    <span className="font-bold mr-[30px]">Product Description:</span> {groupBuy.productDescription}
                </p>
                <p className="py-1">
                    <span className="font-bold mr-[140px]">Price:</span> {groupBuy.price || 0} USDC
                </p>
                <p className="py-1">
                    <span className="font-bold mr-[70px]">Seller Address:</span> {groupBuy.seller}
                </p>{" "}
                {(() => {
                    if (groupBuy.groupBuyState === 0) {
                        return (
                            <p >
                                Ending in :{" "}
                                {Math.round((groupBuy.endTime * 1000 - Date.now()) / 1000 / 60)}{" "}
                                {/* Time left in minutes */}
                                minutes
                            </p>
                        );
                    }
                })()}
                <p className="py-1"><span className="font-bold mr-[57px]">Group buy State:</span> {state === 'Ended' ? (<span className="border border-red-600 px-3 py-1 rounded-md bg-red-200">{state}</span>) : (<span className="border border-blue-800 bg-blue-200 px-3 py-1 rounded-md">{state}</span>)}</p>
                <button className="bg-blue-800 text-white py-3 px-5 rounded-md cursor-pointer hover:border-blue-800 hover:border hover:bg-blue-200  hover:text-blue-800"

                    onClick={() => {
                        setActiveGroupBuy(groupBuy);
                    }}
                >
                    See More
                </button>
            </div>
        );
    }

    function renderSpecificGroupBuy(
        groupBuy: GroupBuys,
        currentUserWalletAddress: string
    ) {
        let state = "";

        if (groupBuy.groupBuyState === 0) {
            state = "Open";
        }
        if (groupBuy.groupBuyState === 1) {
            state = "Ended";
        }

        let isOwner = groupBuy.seller === currentUserWalletAddress;

        let isGroupBuyOpen = state === "Open"; // Check if the group buy is still open
        let hasGroupBuyEnded = state === "Ended"; // Check if the group buy has ended

        let isCurrentUserABuyer = groupBuy.buyers.some(
            (buyer) => buyer.toLowerCase() === currentUserWalletAddress
        );

        return (
            <div className="mt-10 bg-slate-300 rounded-md px-10 py-10 shadow-slate-500 shadow-md">
                <div>
                    <div>
                        <p className="py-1">
                            <span className="font-bold mr-[170px]">Product Name:</span> {groupBuy.productName || 0}{" "}
                        </p>
                        <p className="py-1">
                            <span className="font-bold mr-[125px]">Product Description:</span> {groupBuy.productDescription || 0}{" "}
                        </p>
                        <p ><span className="font-bold mr-[235px]">Price:</span> {groupBuy.price} USDC</p>{" "}
                        {/* Starting price */}
                        <p className="py-1">
                            <span className="font-bold mr-[235px]">Seller:</span> {groupBuy.seller}
                        </p>{" "}
                        <div className="flex">
                            <p className="py-1">
                                <span className="font-bold mr-[20px]">Groupbuy Smart Contract Address:</span>{" "}
                            </p>
                            <p className="py-1">
                                <Link
                                    href={`https://goerli.etherscan.io/address/${groupBuy.groupBuyAddress}`}
                                    target="_blank"
                                >
                                    {groupBuy.groupBuyAddress}
                                </Link>
                            </p>
                        </div>
                        {(() => {
                            if (groupBuy.groupBuyState === 0) {
                                return (
                                    <p className="py-1">
                                        Ending in :{" "}
                                        {Math.round(
                                            (groupBuy.endTime * 1000 - Date.now()) / 1000 / 60
                                        )}{" "}
                                        {/* Time left in minutes */}
                                        minutes
                                    </p>
                                );
                            }
                        })()}
                        <p className="py-1"><span className="font-bold mr-[165px]">Group buy State:</span> {state === 'Ended' ? (<span className="border border-red-600 px-3 py-1 rounded-md bg-red-200">{state}</span>) : (<span className="border border-blue-800 bg-blue-200 px-3 py-1 rounded-md">{state}</span>)}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-black border-b-2 border-black py-5">List of all Buyers</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            borderColor: "black",
                                            borderStyle: "groove",
                                            padding: "10px",
                                        }}
                                    >
                                        Buyer
                                    </th>
                                    <th
                                        style={{
                                            borderColor: "black",
                                            borderStyle: "groove",
                                            padding: "10px",
                                        }}
                                    >
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupBuy.buyers.map((buyer) => {
                                    return (
                                        <tr key={buyer}>
                                            <td className="border-2 border-black"
                                                style={{
                                                    borderColor: "black",
                                                    borderStyle: "groove",
                                                    padding: "10px",
                                                }}
                                            >
                                                {buyer.toLowerCase()}
                                            </td>
                                            <td className="border-2 border-black">
                                                {groupBuy.price} USDC
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {isGroupBuyOpen && !isOwner && !isCurrentUserABuyer ? (
                            <div>
                                <button className="bg-green-800 text-white py-3 px-5 rounded-md cursor-pointer hover:border-green-800 hover:border hover:bg-green-200  hover:text-green-800"
                                    onClick={() => placeOrder(activeGroupBuy)}
                                >
                                    Place Order
                                </button>
                            </div>
                        ) : null}
                        <button
                            className="mt-3 bg-blue-800 text-white py-3 px-5 rounded-md cursor-pointer hover:border-blue-800 hover:border hover:bg-blue-200  hover:text-blue-800"
                            onClick={() => setGroupBuyToActive(null)}
                        >
                            Go Back
                        </button>
                        {isOwner && //only seller can withdraw funds
                            hasGroupBuyEnded && //can only withdraw after group buy ends
                            activeGroupBuy != null &&
                            activeGroupBuy.buyers.length > 0 ? ( //withdraw if there are buyers
                            <button

                                onClick={() => withdrawFunds(activeGroupBuy)}
                            >
                                Withdraw Funds
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            color: "black ",
        },
    };

    useEffect(() => {
        getAllGroupBuys();
    }, []);

    return (
        <div className="bg-gradient-to-r text-black from-violet-600 to-slate-100 min-h-screen">

            <div className="bg-violet-800 flex items-center justify-between text-white  py-6">
                <div className="px-5 ml-[500px]">
                    <span className="w-40 cursor-pointer text-2xl font-semibold"><HiUserGroup className="inline-block mr-2 text-6xl text-blue-600 group-hover:text-white " />groupbuy</span>
                </div>
                <div className="flex items-center pr-6">
                    <IoWalletSharp className="text-[50px] px-2" />
                    {`${currentWalletAddress}`}
                </div>
            </div>
            {/* Loading Modal Component */}
            <LoadingModal isOpen={isLoading} loadedData={loadedData} closeModal={() => setIsLoading(false)} />

            <h2>
                {activeGroupBuy == null ? <div className="text-center text-2xl mt-5">All Group buys</div> : <div className="text-center text-2xl mt-5">Product</div>}
            </h2>

            {/* GroupBuyList Component */}
            <GroupBuyList allGroupBuys={allGroupBuys} renderGroupBuys={renderGroupBuys} />

            <div className="w-[800px] mx-auto">
                {activeGroupBuy != null ? (
                    renderSpecificGroupBuy(activeGroupBuy, currentWalletAddress)
                ) : (
                    <GroupBuyList allGroupBuys={allGroupBuys} renderGroupBuys={renderGroupBuys} />
                )}
            </div>

            {/* CreateGroupBuyForm Component */}
            <CreateGroupBuyForm createGroupBuy={createGroupBuy} />
        </div>
    );
}
