export default {
  parse: (search = '') =>
    search
      .slice(search.indexOf('?') + 1)
      .split('&')
      .reduce((memo, pair) => {
        const [key, value] = pair.split('=');
        if (!key) return memo;
        memo[key] = !!value ? decodeURIComponent(value) : null;
        return memo;
      }, {}),

  stringify: (options = {}) =>
    Object
      .keys(options)
      .map(k =>
        `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`
      )
      .join('&'),
};