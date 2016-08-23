export default el => ({
  run: () =>
    el.dataset.state= 'loading',

  stop: () =>
    el.dataset.state= 'static',
});
