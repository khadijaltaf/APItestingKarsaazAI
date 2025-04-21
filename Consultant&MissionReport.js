// consulatesTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 40, duration: '45s' };

export default function () {
  const res = http.post('https://your-api-url.com/api/v1/trade/consulates', JSON.stringify({
    country: "Aruba"
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    '✅ Consulates - Status 200': (r) => r.status === 200
  });

  sleep(1);
}
