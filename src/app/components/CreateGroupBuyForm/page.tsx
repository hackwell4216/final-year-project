import React, { useState } from "react";

function CreateGroupBuyForm({ createGroupBuy }: any) {
    const [createGroupBuyFields, setGroupBuyFields] = useState({
        endTime: 0,
        price: 0,
        productName: "",
        productDescription: "",
    });

    return (
        <div className="mx-auto w-[800px] my-10 p-[40px] bg-[url('/Image.png')] text-white rounded-md">
            <h2 className="text-center text-2xl">Create Group buy</h2>

            <div className="m-[20px]">
                <label className="mb-4 text-md text-white">Product Name</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    type="text"
                    placeholder="Enter your product name"
                    onChange={(e) =>
                        setGroupBuyFields({
                            ...createGroupBuyFields,
                            productName: e.target.value,
                        })
                    }
                    value={createGroupBuyFields.productName}
                />
            </div>

            <div style={{ margin: "20px" }}>
                <label>Product Description</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    type="text"
                    placeholder="Enter your product description"
                    onChange={(e) =>
                        setGroupBuyFields({
                            ...createGroupBuyFields,
                            productDescription: e.target.value,
                        })
                    }
                    value={createGroupBuyFields.productDescription}
                />
            </div>

            <div style={{ margin: "20px" }}>
                <label>Set Price (USDC)</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    type="number"
                    placeholder="Price"
                    onChange={(e) =>
                        setGroupBuyFields({
                            ...createGroupBuyFields,
                            price: parseFloat(e.target.value),
                        })
                    }
                    value={createGroupBuyFields.price}
                />
            </div>

            <div style={{ margin: "20px" }}>
                <label>Duration in Mins</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    type="number"
                    placeholder="End Time(mins)"
                    onChange={(e) =>
                        setGroupBuyFields({
                            ...createGroupBuyFields,
                            endTime: parseInt(e.target.value),
                        })
                    }
                    value={createGroupBuyFields.endTime}
                />
            </div>
            <button
                className="w-min mx-auto border-2 bg-blue-900 text-white rounded-lg mb-6 hover:bg-blue-500 hover:text-white hover:border hover:border-gray-300"
                type="button"
                onClick={() => createGroupBuy(createGroupBuyFields)}
            >
                Create Group Buy
            </button>
        </div>
    );
}

export default CreateGroupBuyForm;
