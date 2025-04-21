import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100, // Number of virtual users
  duration: '1m', // Test duration
};

export default function () {
  const url = 'https://your-api-url.com/api/v1/trade/market-index'; // Replace with real endpoint

  const payload = JSON.stringify({
    country: 'Pakistan',
    category: 'IT & Services'
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN' // Replace 
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    '✅ Status is 200': (r) => r.status === 200,
    '⚡ Response < 800ms': (r) => r.timings.duration < 800,
    '📊 Valid data structure': (r) => r.json().hasOwnProperty('marketIndex'),
  });

  sleep(1); // Wait before the next iteration
}
