"use client";
import TokenFaucet from "@/components/TokenFaucet";
import faucet_abi from "@/contracts/abi/faucet.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";
import { Abi, Address, decodeErrorResult } from "viem";
import { useWriteContract } from "wagmi";

export default function Home() {
  const { writeContractAsync } = useWriteContract();

  const handleClaimTokenClick = async (wAddress: string) => {
    try {
      const data = await writeContractAsync({
        abi: faucet_abi as Abi,
        address: process.env.NEXT_PUBLIC_FAUCET_CONTRACT_ADDRESS as Address,
        functionName: "requestTokens",
      });
      toast.success(" Your tokens have been successfully transferred 🎉");
      console.log("HASH", data);
    } catch (error: any) {
      try {
        const decodedError = decodeErrorResult({
          abi: faucet_abi as Abi,
          data: error?.data,
        });
        console.log("Decoded Error:", decodedError);
        toast.error("Transaction failed. Please try again.");
      } catch (decodeError) {
        console.log("Error decoding result:", decodeError);
        toast.error("Must have to wait before requesting again.");
      }
    }
  };
  return (
    <div className="bg-blue-50">
      <div className="bg-blue-50 h-screen">
        <div className="absolute top-4 right-4">
          <div className="text-sm">
            <ConnectButton />
          </div>
        </div>
        <TokenFaucet
          onClaimTokens={(wAddress) => handleClaimTokenClick(wAddress)}
        />
      </div>
    </div>
  );
}
