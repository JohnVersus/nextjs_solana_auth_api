import React from "react";
import { Button } from "@web3uikit/core";
import { signIn } from "next-auth/react";
import base58 from "bs58";
import { useAuthRequestChallengeSolana } from "@moralisweb3/next";

export default function PhantomBtn() {
  const { requestChallengeAsync, error } = useAuthRequestChallengeSolana();
  const authenticate = async () => {
    // @ts-ignore
    const provider = window.phantom?.solana;
    const resp = await provider.connect();
    const address = resp.publicKey.toString();
    const chain = "devnet";
    const account = {
      address: address,
      chain: chain,
      network: "solana",
    };
    // const message = "Sign to provide access to app";
    const challenge = await requestChallengeAsync({
      address,
      network: "devnet",
    });
    const encodedMessage = new TextEncoder().encode(challenge?.message);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    const signature = base58.encode(signedMessage.signature);
    try {
      const authResponse = await signIn("credentials", {
        message: challenge?.message,
        signature,
        network: "Solana",
        redirect: false,
      });
      if (authResponse?.error) {
        throw new Error(authResponse.error);
      }
    } catch (e) {
      return;
    }
  };

  return (
    <Button
      text="Phantom"
      theme="primary"
      onClick={() => {
        authenticate();
      }}
    />
  );
}
