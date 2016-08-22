import get from './get';
import query from './query';

export const API_BASE = 'http://api.openpseudonym.org/api';

const q = query({});

export default {
  headings: (options = {}) => {
    return get(`${API_BASE}/headings?${q(options)}`);
  },
};
