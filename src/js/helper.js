import { Promise } from 'core-js';
import { async } from 'regenerator-runtime';
import { Timeout } from './confg';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(Timeout)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'appliction/json' },
        body: JSON.stringify(uploadData),
      }),
      timeout(Timeout),
    ]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
