import crypto from 'crypto';

export const alphabeticalSort = (propertyAccessorFunc = ((value) => value)) =>
    (a, b) => propertyAccessorFunc(a).localeCompare(propertyAccessorFunc(b));

export const ellipse = (text, { limit = 20 } = {}) => text.length > limit
    ? text.substring(0, limit - 3).concat('...') : text;

export const hash = (...data) => crypto.createHash('md5').update(data.map((d) => JSON.stringify(d)).join('')).digest('hex');
