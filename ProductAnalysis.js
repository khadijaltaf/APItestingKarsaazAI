import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 60,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  }
};

export default function () {
  const url = 'https://your-api-url.com/api/v1/trade/product-analysis';
  const payload = {
    product_code: "All",
    year: "2024"
  };

  const res = http.post(url, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '60s'
  });

  check(res, {
    '✅ Product Analysis - 200 OK': (r) => r.status === 200,
    '📦 Response contains data': (r) => {
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
