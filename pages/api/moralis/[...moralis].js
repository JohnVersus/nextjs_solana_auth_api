import { MoralisNextApi } from "@moralisweb3/next";

const DATE = new Date();
const FUTUREDATE = new Date(DATE);
FUTUREDATE.setDate(FUTUREDATE.getDate() + 1);

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY,
  authentication: {
    timeout: 120,
    domain: process.env.APP_DOMAIN,
    uri: process.env.NEXTAUTH_URL,
    expirationTime: FUTUREDATE.toISOString(),
    statement: "Sign message to authenticate.",
  },
});
