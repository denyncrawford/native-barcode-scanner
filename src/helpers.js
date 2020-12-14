
const isValid = (validKey, key) => validKey.test(key);

const isEndKey = (endKey, key) => {
  return key.includes(endKey);
}

const formatKey = (uppercase, key) => {
  return !uppercase ? key.toLowerCase() : key;
}

export {
  isValid,
  isEndKey,
  formatKey
}