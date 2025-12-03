import crypto from 'crypto';
import moment from 'moment';

export const alphabeticalSort =
  (propertyAccessorFunc = (value) => value) =>
  (a, b) =>
    propertyAccessorFunc(a).localeCompare(propertyAccessorFunc(b));

export const ellipse = (text, { limit = 20 } = {}) =>
  text.length > limit ? text.substring(0, limit - 3).concat('...') : text;

export const hash = (...data) =>
  crypto
    .createHash('md5')
    .update(data.map((d) => JSON.stringify(d)).join(''))
    .digest('hex');

export function convertMongoTimestamp(timestamp) {
  if (moment.isMoment(timestamp)) {
    return timestamp;
  }

  const { $timestamp: bsonTimestamp } = timestamp;

  // Convert the string timestamp to a BigInt (because it's a 64-bit value)
  const timestampBigInt = BigInt(bsonTimestamp);

  // Right-shift to get the seconds part (high 32 bits)
  const seconds = Number(timestampBigInt >> 32n);

  return moment(seconds * 1000);
}

export const intersperse = (array, delimiter) => [
  ...intersperseGenerator(array, delimiter),
];

function* intersperseGenerator(array, delimiter) {
  let element = true;
  for (const x of array) {
    if (!element) yield delimiter;
    element = false;
    yield x;
  }
}

export const mapObject = (obj, ...mappingFunctions) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value], index) => [
      key,
      mappingFunctions.reduce(
        (accValue, mappingFunction) => mappingFunction(accValue, key, index),
        value,
      ),
    ]),
  );

export const downloadJSON = (jsonData, filename = 'download.json') => {
  const jsonBlob = new Blob([JSON.stringify(jsonData)], {
    type: 'application/json',
  });

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(jsonBlob);
  a.download = filename;
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);
};

// The distance multiplier when moving at 45°
export const _45_DEGREE_DISTANCE_MULTIPLIER =
  Math.sqrt(Math.pow(1, 2) + Math.pow(1, 2)) / 2;
