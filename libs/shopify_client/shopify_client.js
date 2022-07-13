import Client from "shopify-buy";

// const client = Client.buildClient({
//   domain: "saboor100.myshopify.com",
//   storefrontAccessToken: "33d682fea98b68edeb389fbf0c3deead",
//   language: "ja-JP",
// });
const client = Client.buildClient({
  storefrontAccessToken: "91cfa2924595373a7899a83a1ef4837b",
  domain: "store-prosi.myshopify.com",
});

export default client;
