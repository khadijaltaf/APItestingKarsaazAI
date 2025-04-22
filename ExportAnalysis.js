import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 60,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% of requests should be below 3s
    http_req_failed: ['rate<0.01'],    // less than 1% errors
  },
};

const BASE_URL = 'https://your-api-url.com'; // replace with actual API gateway or environment URL

export default function () {
  const payload = JSON.stringify({
    exporting_country: "Aruba",
    importing_country: "All",
    product_code: "All",
    year: "2024"
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${__ENV.KARSAZ_API_TOKEN}` // Optional: add auth token for staging/prod
  };

  const res = http.post(`${BASE_URL}/api/v1/trade/export-analysis`, payload, { headers });

  check(res, {
    '✅ Status is 200': (r) => r.status === 200,
    '✅ Content-Type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    '✅ Response not empty': (r) => r.body && r.body.length > 20,
  });

  sleep(1); // simulate user pacing
}
