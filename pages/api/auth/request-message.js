import Moralis from "moralis";

const TIME = new Date();
const FUTURE = new Date(
  TIME.getFullYear(),
  TIME.getMonth(),
  TIME.getDate() + 7,
  TIME.getHours(),
  TIME.getMinutes(),
  TIME.getSeconds(),
  TIME.getMilliseconds()
);
const DOMAIN = process.env.APP_DOMAIN;
const STATEMENT = "Please sign this message to confirm your identity.";
const URI = process.env.NEXTAUTH_URL;
const EXPIRATION_TIME = FUTURE.toISOString();
const NOT_BEFORE = TIME.toISOString();
const TIMEOUT = 30;

export default async function handler(req, res) {
  const { address, chain, network } = JSON.parse(req.body);

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    if (!DOMAIN || !URI) {
      throw new Error("Please add APP_DOMAIN in the .env.local");
    }

    const message = await Moralis.Auth.requestMessage({
      address: address,
      solNetwork: chain,
      network: network,
      domain: DOMAIN,
      statement: STATEMENT,
      uri: URI,
      expirationTime: EXPIRATION_TIME,
      timeout: TIMEOUT,
      notBefore: NOT_BEFORE,
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
