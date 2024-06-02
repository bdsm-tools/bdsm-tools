export const alphabeticalSort = (propertyAccessorFunc = ((value) => value)) =>
  (a, b) => propertyAccessorFunc(a).localeCompare(propertyAccessorFunc(b))

export const ellipse = (text, { limit = 20 } = {}) => text.length > limit
  ? text.substring(0, limit - 3).concat('...') : text

export const intersperse = (array, delimiter) => [...intersperseGenerator(array, delimiter)];

function *intersperseGenerator(array, delimiter) {
  let element = true;
  for (const x of array) {
    if (!element) yield delimiter;
    element = false;
    yield x;
  }
}