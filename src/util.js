import crypto from 'crypto';
import moment from 'moment';

export const alphabeticalSort = (propertyAccessorFunc = ((value) => value)) =>
    (a, b) => propertyAccessorFunc(a).localeCompare(propertyAccessorFunc(b));

export const ellipse = (text, { limit = 20 } = {}) => text.length > limit
    ? text.substring(0, limit - 3).concat('...') : text;

export const hash = (...data) => crypto.createHash('md5').update(data.map((d) => JSON.stringify(d)).join('')).digest('hex');

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
