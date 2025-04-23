import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 40,
  duration: '45s'
};

export default function () {
  const payload = {
    country: "Aruba"
  };

  const res = http.post('https://your-api-url.com/api/v1/trade/consulates',
    JSON.stringify(payload),
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: '60s'
    }
  );

  check(res, {
    '✅ Status 200': (r) => r.status === 200,
    '✅ JSON Not Empty': (r) => r.json() && Object.keys(r.json()).length > 0
  });

  if (res.status !== 200) {
    console.error(`❌ Failed with status: ${res.status} - Body: ${res.body}`);
  }

  sleep(1);
}
