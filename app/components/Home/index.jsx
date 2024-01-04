'use client';
import { set } from 'mongoose';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Home = () => {
    const router = useRouter();
    const [account, setAccount] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const connectwalletHandler = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccount(accounts[0]);
        }
        else {
            alert('Please install metamask');

        }
    }



    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    }

    const handleMintButtonClick = async () => {
        const data = JSON.stringify({account});
        const res = await fetch('/api/nftAddress',{
            method:'POST',
            body: data,
            "Content-Type" : "application/json"

        });

        if(!res.ok) {
            throw new Error('Something went wrong');
        }

        router.refresh();
       
        alert('Minting Successful');
        setSelectedImage(null);
      };


    return (
<div className='w-full flex flex-col justify-center items-center p-4 md:p-8 lg:p-12'>
    {!account ? (
        <button
            onClick={connectwalletHandler}
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full'
        >
            Connect Wallet
        </button>
    ) : (
        <div className="max-w-sm mx-auto mt-8">
            <label className="w-full flex items-center justify-center bg-gray-200 text-gray-700 p-4 rounded-md cursor-pointer">
                <span className="text-base leading-normal">Choose an image</span>
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>

            {selectedImage && (
                <div className="mt-4">
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-auto rounded-md shadow-md"
                    />
                </div>
            )}

            {selectedImage && (
                <button
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                    onClick={handleMintButtonClick}
                >
                    Mint
                </button>
            )}
        </div>
    )}
</div>
    )
}

export default Home