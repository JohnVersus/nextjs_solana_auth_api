import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import base58 from "bs58";
import { apiPost } from "../../utils/apiPost";
import { signIn, signOut } from "next-auth/react";
import { useAuthRequestChallengeSolana } from "@moralisweb3/next";

export default function WalletAdaptor() {
  const { publicKey, signMessage, disconnecting, disconnect, connected } =
    useWallet();
  const [signed, setSigned] = useState(false);
  const { requestChallengeAsync, error } = useAuthRequestChallengeSolana();

  const signCustomMessage = async () => {
    const address = publicKey.toBase58();

    const { message } = await requestChallengeAsync({
      address,
      network: "devnet",
    });
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await signMessage(encodedMessage, "utf8");
    setSigned(true);
    const signature = base58.encode(signedMessage);
    try {
      const { error } = await signIn("credentials", {
        message,
        signature,
        network: "Solana",
        redirect: false,
      });
      if (error) {
        throw new Error(error);
      }
    } catch (e) {
      disconnect();
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      disconnect();
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (disconnecting) {
      signOut({ redirect: false });
    }
  }, [disconnecting]);

  useEffect(() => {
    connected && signCustomMessage();
  }, [connected]);

  return (
    <>
      <WalletMultiButton />
    </>
  );
}
