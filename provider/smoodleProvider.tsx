import { config } from "@/lib/wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

interface ProvidersProps {
  readonly children: ReactNode;
}

const SmoodleProvider: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#0E76FD",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <div className={inter.className}>{children}</div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default SmoodleProvider;
