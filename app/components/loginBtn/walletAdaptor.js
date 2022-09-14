import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import base58 from "bs58";
import { apiPost } from "../../utils/apiPost";
import { signIn } from "next-auth/react";

export default function WalletAdaptor() {
  const { publicKey, signMessage } = useWallet();
  const [signed, setSigned] = useState(false);

  const signCustomMessage = async () => {
    const address = publicKey.toBase58();
    const chain = "devnet";
    const account = {
      address: address,
      chain: chain,
      network: "solana",
    };
    // const message = "Sign to provide access to app";
    const { message } = await apiPost("api/auth/request-message", account);
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await signMessage(encodedMessage, "utf8");
    setSigned(true);
    const signature = base58.encode(signedMessage);
    try {
      await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    publicKey ? !signed && signCustomMessage() : setSigned(false);
  }, [publicKey]);

  return (
    <>
      <WalletMultiButton />
    </>
  );
}
