import qs from './qs';

export default params => (options = {}) => {
  const query = Object.assign({}, params, options);

  for(var k in query) {
    if (!query[k]) delete query[k];
  }

  return qs.stringify(query);
};
