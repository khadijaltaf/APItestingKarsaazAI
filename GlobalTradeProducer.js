import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '1m'
};

export default function () {
  const url = 'https://your-api-url.com/api/v1/trade/producer-flow'; // Replace this with actual API endpoint

  const payload = JSON.stringify({
    importing_country: "Afghanistan",
    exporting_country: "Afghanistan",
    product_code: "010110",
    flow: "Import"
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN' // Optional
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    '✅ Status is 200': (r) => r.status === 200,
    '⏱ Response under 800ms': (r) => r.timings.duration < 800,
    '📦 Contains trade data': (r) => r.body.includes("Afghanistan") || r.json().hasOwnProperty("data")
  });

  sleep(1);
}
