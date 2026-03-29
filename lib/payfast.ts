const BASE_URL = (process.env.PAYFAST_BASE_URL || "").split("#")[0].trim().replace(/\/$/, "");
const MERCHANT_ID = (process.env.PAYFAST_MERCHANT_ID || "").split("#")[0].trim();
const SECURED_KEY = (process.env.PAYFAST_SECURED_KEY || "").split("#")[0].trim();

// Step 1: Get Access Token
export async function getPayfastToken(customerIp: string, orderId: string, amount: number) {
  const params = new URLSearchParams({
    MERCHANT_ID: MERCHANT_ID,
    SECURED_KEY: SECURED_KEY,
    grant_type: "client_credentials",
    customer_ip: customerIp,
    BASKET_ID: orderId,
    TXNAMT: amount.toString(),
    CURRENCY_CODE: "PKR",
  });

  let res;
  try {
    res = await fetch(`${BASE_URL}/Transaction/GetAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch (err: any) {
    const errorDetails = err.cause ? err.cause.message || err.cause.code : err.message;
    throw new Error(`Connection Error: ${errorDetails} (URL: ${BASE_URL})`);
  }

  const responseText = await res.text();
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    console.error("PayFast returned non-JSON:", responseText);
    throw new Error(`PayFast API Error (Not JSON): ${responseText.substring(0, 150)}...`);
  }

  if (!data.token) {
    console.error("PayFast Token Error Response:", data);
    throw new Error(`Token Error: ${JSON.stringify(data)}`);
  }
  return data.token as string;
}

// Step 2: Initiate Transaction — returns a redirect URL
export async function initiatePayfastTransaction({
  token,
  orderId,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  customerIp,
}: {
  token: string;
  orderId: string;
  amount: number; // in PKR
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerIp: string;
}) {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  const body = {
    merchant_id: MERCHANT_ID,
    secured_key: SECURED_KEY,
    token,
    basket_id: orderId,             // your unique order ID
    txnamt: amount.toString(),       // amount in PKR
    currency_code: "PKR",
    order_date: new Date().toISOString().split("T")[0],
    customer_mobile_no: customerPhone,
    customer_email_address: customerEmail,
    success_url: `${APP_URL}/checkout/success?orderId=${orderId}`,
    failure_url: `${APP_URL}/checkout/failed?orderId=${orderId}`,
    checkout_url: `${BASE_URL}/Transaction/PostTransaction`, // PayFast hosted page
    customer_name: customerName,
    customer_ip: customerIp,
  };

  let res;
  try {
    res = await fetch(`${BASE_URL}/Transaction/GetTransactionToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (err: any) {
    const errorDetails = err.cause ? err.cause.message || err.cause.code : err.message;
    throw new Error(`Connection Error: ${errorDetails}`);
  }

  const responseText = await res.text();
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    console.error("PayFast returned non-JSON:", responseText);
    throw new Error(`PayFast API Error (Not JSON): ${responseText.substring(0, 150)}...`);
  }

  if (!data.token && !data.redirectUrl) {
    console.error("PayFast Transaction Response Error:", data);
  }

  return data; // contains transaction token + redirect URL
}
