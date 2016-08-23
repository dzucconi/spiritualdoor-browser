export const compact = arr => arr.filter(x => !!x);

export const wait = (ms = 1) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const truncate = (x, length, remainder = '…') =>
  x.length > length ? x.slice(0, length) + remainder : x;

export const pluck = (obj, properties) =>
  compact(properties.map(property => obj[property]));
