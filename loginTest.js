import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,         
  duration: '1m',  
};

export default function () {
  const url = 'URL'; //api
  const payload = JSON.stringify({
    email: 'fortest@gmail.com',
    password: 'Asad786!'
  });

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(url, payload, { headers });

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
