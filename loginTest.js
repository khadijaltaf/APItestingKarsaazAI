import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '1m',
};

export default function () {
  const url = 'https://your-api.com/api/v1/auth/login'; //Replace with actual
  const payload = JSON.stringify({
    email: 'fortest@gmail.com',
    password: 'Asad786!'
  });

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(url, payload, { headers });

  check(res, {
    '✅ Status is 200': (r) => r.status === 200,
    '⚡ Response time < 500ms': (r) => r.timings.duration < 500,
    '🔐 Contains token or success': (r) => r.body.includes('token') || r.body.includes('success')
  });

  if (res.status !== 200) {
    console.error(`❌ Login failed | Status: ${res.status} | Response: ${res.body}`);
  }

  sleep(1);
}
