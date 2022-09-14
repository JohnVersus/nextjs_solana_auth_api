# Info

This is a simple NextJs App that lets you use [Moralis](https://moralis.io/) Auth API to create web3 user session with the Solana web3 wallets.

# Getting Started

## Setup .env.local

Get the Solana API key from [Moralis admin page](https://admin.moralis.io/web3apis)

Rename the .env.local.example to .env.local and add the required API and NFT secrets.

## Install Packages

Run yarn install to install the packages

```bash
yarn
or
yarn install
```

## Start local server

Run the development server in port 8000 as the `NEXTAUTH_URL` in env.local file is set to this port. This can be updated to the required port after changing the `NEXTAUTH_URL` in the env.local fuile.

```bash
yarn run dev -p 8000
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the and

## Learn More

To learn more about Morlais API, take a look at [Moralis Docs](https://docs.moralis.io/moralis-dapp/solana-api).

To get you questions answered reach out to Moralis [forum](https://forum.moralis.io/) or [discord](https://moralis.io/joindiscord/)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn NextAuth.js](https://next-auth.js.org/getting-started/introduction) - open-source authentication solution for Next.js applications.
