import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 40,
  duration: '45s',
  thresholds: {
    http_req_failed: ['rate<0.01'],  // Less than 1% failure rate
    http_req_duration: ['p(95)<1000']  // 95% of requests < 1s
  }
};

export default function () {
  const url = 'https://your-api-url.com/api/v1/trade/logistics';
  const payload = { country: "Aruba" };

  const res = http.post(url, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '60s'
  });

  check(res, {
    '✅ Logistics - 200 OK': (r) => r.status === 200,
    '📦 Contains logistics data': (r) => {
      try {
        const json = r.json();
        return json.data && json.data.length > 0;
      } catch (e) {
        return false;
      }
    }
  });

  if (res.status !== 200) {
    console.error(`❌ Error ${res.status} - ${res.body}`);
  }

  sleep(1);
}
