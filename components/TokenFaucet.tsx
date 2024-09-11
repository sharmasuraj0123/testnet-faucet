"use client";
import coinsvg from "@/assets/icons/coin.svg";
import downloadsvg from "@/assets/icons/download.svg";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address } from "viem";
import { useAccount } from "wagmi";

type TokenFaucetProps = {
  onClaimTokens: (walletAddress: string) => void;
};

const config = {
  title: "<<Name of the faucet token>>",
  heading: "<<This is the faucet token information>>",
};

const TokenFaucet: FC<TokenFaucetProps> = ({ onClaimTokens }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    setWalletAddress(address ? (address as Address) : "");
  }, [address]);

  const handleClaimTokens = () => {
    if (onClaimTokens && walletAddress) {
      onClaimTokens(walletAddress);
    } else {
      toast.error("Enter a wallet address to claim tokens.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="p-8 w-100 text-center">
        <div className="mb-4">
          <div className="bg-pink-200 rounded-full p-2 inline-flex items-center justify-center">
            <Image src={coinsvg} alt="coin svg" width={70} height={70} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          {config.title}
        </h2>
        <p className="text-sm text-gray-600 mb-6">{config.heading}</p>
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-4">
          <input
            type="text"
            placeholder="Enter your wallet address"
            className="flex-grow bg-transparent outline-none text-gray-700 text-sm"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <button className="text-blue-500 ml-2">
            <Image src={coinsvg} alt="coin svg" width={30} height={30} />
          </button>
        </div>
        <button
          onClick={handleClaimTokens}
          className="bg-pink-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-pink-600 transition text-sm"
        >
          <div className=" flex-row flex">
            <Image src={downloadsvg} alt="coin svg" width={20} height={20} />
            Claim Tokens
          </div>
        </button>
      </div>
    </div>
  );
};

export default TokenFaucet;
