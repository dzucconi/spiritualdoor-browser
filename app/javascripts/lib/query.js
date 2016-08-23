import qs from './qs';

export default params => (options = {}) =>
  qs.stringify(Object.assign({}, params, options));
