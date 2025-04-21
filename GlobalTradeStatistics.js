// globalTraderProducerTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 50, duration: '1m' };

export default function () {
  const res = http.post('https://your-api-url.com/api/v1/trade/producer-flow', JSON.stringify({
    importing_country: "Afghanistan",
    exporting_country: "Afghanistan",
    product_code: "010110",
    flow: "Import"
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    '✅ Producer - Status 200': (r) => r.status === 200,
    '📦 Has results': (r) => r.body.includes('Afghanistan')
  });

  sleep(1);
}
