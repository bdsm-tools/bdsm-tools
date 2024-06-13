export const alphabeticalSort = (propertyAccessorFunc = ((value) => value)) =>
  (a, b) => propertyAccessorFunc(a).localeCompare(propertyAccessorFunc(b))

export const ellipse = (text, { limit = 20 } = {}) => text.length > limit
  ? text.substring(0, limit - 3).concat('...') : text

export const intersperse = (array, delimiter) => [...intersperseGenerator(array, delimiter)]

function * intersperseGenerator (array, delimiter) {
  let element = true
  for (const x of array) {
    if (!element) yield delimiter
    element = false
    yield x
  }
}

export const mapObject = (obj, ...mappingFunctions) => Object.fromEntries(Object.entries(obj).map(
  ([key, value], index) => [key, mappingFunctions.reduce((value, mappingFunction) => mappingFunction(value, key, index), value)]
));

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
