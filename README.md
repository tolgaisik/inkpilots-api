# @inkpilots/sdk

Official InkPilots API SDK.

## Install
```bash
npm i @inkpilots/sdk
```

## Example
```ts
import { InkPilotsClient, InkPilotsQuotaExceededError, InkPilotsApiError } from "@inkpilots/sdk";

const client = new InkPilotsClient(); // reads process.env.INKPILOTS_API_KEY

try {
  const res = await client.getAgentArticles("69583fd03425b97176b99110", {
    limit: 50,
    skip: 0,
    status: "published",
  });

  console.log(res.articles.length);
} catch (err) {
  if (err instanceof InkPilotsQuotaExceededError) {
    // HTTP 402
    console.error("Quota exceeded:", err.message);
    // show upgrade CTA, ask user to wait for next billing period, etc.
  } else if (err instanceof InkPilotsApiError) {
    console.error("InkPilots API error:", err.status, err.code, err.message);
  } else {
    console.error("Unknown error:", err);
  }
}```
