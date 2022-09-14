import React from "react";
import { Button } from "@web3uikit/core";
import { signIn } from "next-auth/react";
import { apiPost } from "../../utils/apiPost";
import base58 from "bs58";

export default function SolflareBtn() {
  const authenticate = async () => {
    const provider = window.solflare;
    const resp = await provider.connect();
    const address = provider.publicKey.toString();
    const chain = "devnet";
    const account = {
      address: address,
      chain: chain,
      network: "solana",
    };
    // const message = "Sign to provide access to app";
    const { message } = await apiPost("api/auth/request-message", account);
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    const signature = base58.encode(signedMessage.signature);
    try {
      await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });
      push("/");
    } catch (e) {
      return;
    }
  };

  return (
    <>
      <Button
        text="Solflare"
        theme="primary"
        onClick={() => {
          authenticate();
        }}
      />
    </>
  );
}
