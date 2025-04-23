import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 60,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],  // less than 1% should fail
    http_req_duration: ['p(95)<1000']  // 95% of requests under 1s
  }
};

export default function () {
  const url = 'https://your-api-url.com/api/v1/trade/import-analysis';
  const payload = {
    importing_country: "Aruba",
    exporting_country: "All",
    product_code: "All",
    year: "2024"
  };

  const res = http.post(url, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '60s'
  });

  check(res, {
    '✅ Import Analysis - 200 OK': (r) => r.status === 200,
    '📦 Response has data array': (r) => {
      try {
        const json = r.json();
        return json.data && json.data.length > 0;
      } catch (e) {
        return false;
      }
    }
  });

  if (res.status !== 200) {
    console.error(`❌ Error ${res.status}: ${res.body}`);
  }

  sleep(1);
}
