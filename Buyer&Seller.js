// buyerSellerTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 50, duration: '1m' };

export default function () {
  const res = http.post('https://your-api-url.com/api/v1/trade/buyer-seller', JSON.stringify({
    country: "Afghanistan",
    business_type: "Exporter",
    product_code: "010110"
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    '✅ Buyer/Seller - 200 OK': (r) => r.status === 200,
    '📊 Buyer/Seller contains result': (r) => r.body.includes("Exporter")
  });
  
  if (res.status !== 200) {
    console.error(`❌ Request failed with status ${res.status}: ${res.body}`);
  }
  

  sleep(1);
}
