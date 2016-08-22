import api from '../lib/api';

export default class Headings {
  constructor() {
    this.collection = [];
  }

  fetch() {
    return api.headings
      .apply(null, arguments)
      .then(res => {
        this.collection.concat(res.headings);
        return res;
      });
  }
}
