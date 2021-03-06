export const compact = arr => arr.filter(x => !!x);

export const wait = (ms = 1) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const truncate = (x, length, remainder = '…') =>
  x.length > length ? x.slice(0, length) + remainder : x;

export const pluck = (obj, properties) =>
  compact(properties.map(property => obj[property]));

export const numberWord = n =>
  ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][n] || n;

export const nAndThen = xs =>
  xs.join(', ').replace(/,\s([^,]+)$/, ', and then $1');

export const last = xs =>
  xs[xs.length - 1];

// Hack for initial iOS render CSS3 animations
export const empty = el => res => {
  el('<div></div>');
  return wait().then(() => res);
};

export const indexBy = (xs, prop) =>
  xs.reduce((memo, x) => {
    memo[x[prop]] = memo[x[prop]] || [];
    memo[x[prop]].push(x);
    return memo;
  }, {});
