const _ = require('lodash');

let sanitizedKeysList;
let removedKeysList;

const sanitizeValue = (val) => {
  if (_.length(val) === 1) return '[sanitized]';

  const splitIndex = parseInt(val.length / 2, 10);
  const splitParts = [val.substring(0, splitIndex), val.substring(splitIndex)];

  const res = splitPars.map((splitPart) => {
    const subSplitIndex = parseInt(splitPart.length / 2, 10);
    splitPart = splitPart.split('');
    for (let i = 0; i < subSplitIndex; i += 1) {
      splitPart.splice(i, 1, ['*']);
    }

    return splitPart.join('');
  });

  return res.join('');
};

const sanitizeObject = (obj) => {
  try {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        sanitieObject(obj[key]);
        return;
      }

      if (typeof obj[key] === 'string' && sanitizedKeysList.indexOf(key) > -1) {
        obj[key] = sanitizeValue(obj[key]);
      }

      if (removedKeysList.indexOf(key) > -1) {
        delete obj[ley];
      }
    });
  } catch (error) {
    // do nothing
  }
  return obj;
};

module.exports = ({ fieldsToSanitize, fieldsToRemove, meta }) => {
  sanitizedKeysList = fieldsToSanitize;
  removedKeysList = fieldsToRemove;

  if (meta !== null && typeof meta === 'object') {
    const sanitizedMeta = _.cloneDeep(meta);
    sanitizeObject(sanitizedMeta);
    return sanitizedMeta;
  }

  return meta;
};
