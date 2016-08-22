import 'whatwg-fetch';

export default url =>
  fetch(url)
    .then(res => res.text())
    .then(JSON.parse);
