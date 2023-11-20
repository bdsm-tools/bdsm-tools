export const alphabeticalSort = (propertyAccessorFunc = ((value) => value)) =>
  (a, b) => propertyAccessorFunc(a).localeCompare(propertyAccessorFunc(b))

export const ellipse = (text, { limit = 20 } = {}) => text.length > limit
  ? text.substring(0, limit - 3).concat('...') : text;

const combine = (existingObject, updateObject) => {
  const obj = { ...existingObject };
  Object.keys(updateObject).forEach(key => {
    obj[key] = typeof updateObject[key] === 'object' ? combine(existingObject[key], updateObject[key]) : updateObject[key];
  })
  return obj;
}

export const createNestedObject = (key, existingObject = {}) => (value) => {
  const [key1, ...extraKeys] = key.split('.');

  if (extraKeys.length === 0) {
    const actualValue = typeof value === 'function' ? value(existingObject[key1]) : value
    return Array.isArray(existingObject)
      ? existingObject.map((item, index) => (index === parseInt(key1) ? actualValue : item))
      : {
        ...existingObject,
        [key1]: typeof actualValue === 'object' ? combine(existingObject[key1], actualValue) : actualValue,
      };
  }

  const remainingKeys = extraKeys.join('.');
  if (Array.isArray(existingObject)) {
    const index = parseInt(key1);
    existingObject[index] = createNestedObject(remainingKeys, existingObject[index])(value);
    return existingObject;
  } else {
    return {
      ...existingObject,
      [key1]: createNestedObject(remainingKeys, existingObject[key1])(value),
    };
  }
}

export const keyUpdater = (setStateFn) => (key) => (value) => setStateFn((prevState) => {
  const updatedState = createNestedObject(key, prevState)(value);

  return Array.isArray(prevState) ? [...prevState] : { ...prevState, ...updatedState };
});

export const capitalizeFirstLetter = (str) => str && typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : str

const SPECIAL_NUMBERS = [
  'zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
  'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'
];

const DECA_PREFIXES = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

export const stringifyNumber = (n, sentenceStart = false) => {
  if (isNaN(n) || n < 0) {
    throw new Error('Input must be a positive number');
  }
  if (n > 99) {
    return `${n}th`;
  }

  const result = n < SPECIAL_NUMBERS.length
    ? (SPECIAL_NUMBERS[n])
    : (n % 10 === 0
      ? (`${DECA_PREFIXES[Math.floor(n / 10) - 2]}ieth`)
      : (`${DECA_PREFIXES[Math.floor(n / 10) - 2]}y-${SPECIAL_NUMBERS[n % 10]}`));

  return sentenceStart ? capitalizeFirstLetter(result) : result;
};

export const downloadJSON = (jsonData, filename = 'download.json') => {
  const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(jsonBlob);
  a.download = filename;
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);
};
