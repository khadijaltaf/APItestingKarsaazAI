// exportAnalysisTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 60, duration: '1m' };

export default function () {
  const res = http.post('https://your-api-url.com/api/v1/trade/export-analysis', JSON.stringify({
    exporting_country: "Aruba",
    importing_country: "All",
    product_code: "All",
    year: "2024"
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    '✅ Export Analysis - 200 OK': (r) => r.status === 200
  });

  sleep(1);
}
