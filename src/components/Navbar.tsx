import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

type NavbarProps = {
  balance?: string;
};

const Navbar: React.FC<NavbarProps> = ({ balance }) => {
  const { isConnected } = useAccount();
  return (
    <nav className="sticky top-4 flex items-center justify-between py-3 px-5 rounded-full mt-4 w-full max-w-[1200px] mx-auto bg-gray-600/20 backdrop-blur-lg z-[100]">
        <h1 className="font-extrabold lg:text-2xl text-sm"> Storacha Synapse File Upload Demo</h1>
        {isConnected && balance && <p>USDFC Balance - {balance + "$"} </p>}
      <ConnectButton
        showBalance={true}
        chainStatus={{ smallScreen: "none", largeScreen: "icon" }}
      />
    </nav>
  );
}

export default Navbar;