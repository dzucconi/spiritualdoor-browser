export default el => {
  const fn = x => el.innerHTML = x;
  fn.el = el;
  return fn;
};
