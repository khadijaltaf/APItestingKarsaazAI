// productAnalysisTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 60, duration: '1m' };

export default function () {
  const res = http.post('https://your-api-url.com/api/v1/trade/product-analysis', JSON.stringify({
    product_code: "All",
    year: "2024"
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    '✅ Product Analysis - 200 OK': (r) => r.status === 200
  });

  sleep(1);
}
