import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 50, duration: '1m' };

export default function () {
  const payload = {
    importing_country: "Afghanistan",
    exporting_country: "Afghanistan",
    product_code: "010110",
    flow: "Import"
  };

  const res = http.post('https://your-api-url.com/api/v1/trade/producer-flow',
    JSON.stringify(payload),
    { headers: { 'Content-Type': 'application/json' }, timeout: '60s' }
  );

  check(res, {
    '✅ Producer - Status 200': (r) => r.status === 200,
    '📦 Has JSON data': (r) => {
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
