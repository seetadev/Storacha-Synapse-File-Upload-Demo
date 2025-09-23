"use client";
import { StorageManager } from "@/components/StorageManager";
import { useAccount } from "wagmi";
import {  useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalances } from "@/hooks/useBalances";
import Github from "@/components/ui/icons/Github";
import Filecoin from "@/components/ui/icons/Filecoin";
import Navbar from "./components/Navbar";
import { UploadedFileViewer } from "./components/UploadedFileViewer";

type Tab = "manage-storage" | "upload" | "uploaded-files";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  const { isConnected, chainId } = useAccount();
  const [activeTab, setActiveTab] = useState<Tab>("manage-storage");
  const { data: balances, isLoading: isLoadingBalances } = useBalances();


  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="w-full flex flex-col justify-center min-h-fit">
      <Navbar balance={balances.usdfcBalanceFormatted.toFixed(2).toString()} />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center my-10  w-full mx-auto"
      >
        <motion.div
          
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold uppercase tracking-tighter text-black flex items-center gap-2"
        >
          <Filecoin />
          Storacha Synapse File Upload Demo
          <motion.a
            whileHover={{ scale: 1.3 }}
            href="https://github.com/seetadev/Storacha-Synapse-File-Upload-Demo"
            className="text-primary transition-colors duration-200 hover:underline cursor-pointer rounded-md hover:text-[#008cf6]"
            target="_blank"
          >
            <Github />
          </motion.a>
         
        </motion.div>

        {isConnected && !isLoadingBalances && <motion.p
          
          className="text-lg font-semibold capitalize-none transition-colors duration-50 mb-2  mt-1 flex items-center gap-2 text-center"
        >
          Upload files to filecoin with{" "}
          <motion.a
            href="https://docs.secured.finance/usdfc-stablecoin/getting-started"
            className="text-blue-700 hover:underline cursor-pointer"
            target="_blank"
          >
            USDFC
          </motion.a>
          your balance is
          <span className="font-bold">
            {isLoadingBalances || !isConnected
              ? "..."
              : balances?.usdfcBalanceFormatted.toFixed(1) + "$"}
          </span>
        </motion.p>}

        {chainId !== 314159 && (
          <motion.p
            
            className="text-lg font-semibold capitalize-none transition-colors duration-50 mb-2  mt-1 hover:text-foreground flex items-center gap-2 text-center"
          >
            <span className="max-w-xl text-center bg-red-600/70  p-2 rounded-md">
              ⚠️ Filecoin mainnet is not supported yet. Please use Filecoin
              Calibration network.
            </span>
          </motion.p>
        )}
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div
              key="connect"
              
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ConnectButton />
              </motion.div>
              <motion.p  className="mt-3 text-secondary">
                Please connect your wallet to upload dApp
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              
              className="mt-3 max-w-5xl bg-white w-full border-1 rounded-lg p-8"
            >
              <motion.div className="flex mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabChange("manage-storage")}
                  className={`flex-1 py-2 px-4 text-center border-b-2 transition-colors ${
                    activeTab === "manage-storage"
                      ? "border-primary text-secondary-foreground bg-secondary"
                      : "border-transparent text-secondary hover:text-primary hover:bg-secondary"
                  }`}
                >
                  Manage Storage
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabChange("upload")}
                  className={`flex-1 py-2 px-4 text-center border-b-2 transition-colors ${
                    activeTab === "upload"
                      ? "border-primary text-secondary-foreground bg-secondary"
                      : "border-transparent text-secondary hover:text-primary hover:bg-secondary"
                  }`}
                >
                  Upload File
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabChange("uploaded-files")}
                  className={`flex-1 py-2 px-4 text-center border-b-2 transition-colors ${
                    activeTab === "uploaded-files"
                      ? "border-primary text-secondary-foreground bg-secondary"
                      : "border-transparent text-secondary hover:text-primary hover:bg-secondary"
                  }`}
                >
                  View Uploaded Files
                </motion.button>
              </motion.div>

              <AnimatePresence mode="wait">
                {activeTab === "manage-storage" ? (
                  <motion.div
                    key="deposit"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <StorageManager />
                  </motion.div>
                ) : activeTab === "upload" ? (
                  <motion.div
                    key="upload"
                    // top to bottom
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: +20 }}
                   
                  >
                    <FileUploader />
                  </motion.div>
                ) : (
                  activeTab === "uploaded-files" && (
                    <motion.div
                      key="uploaded-files"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <UploadedFileViewer />
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
