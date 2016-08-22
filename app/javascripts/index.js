import page from 'page';
import qs from './lib/qs';
import Headings from './collections/headings';

// Pages
import index from './pages/index';

const render = el => {
  const fn = x => el.innerHTML = x;
  fn.el = el;
  return fn;
};

const headings = new Headings;

const enrich = (ctx, next) => {
  ctx.collection = headings;
  ctx.parsed = qs.parse(location.search.slice(1));
  ctx.els = {
    stage: render(document.getElementById('stage')),
    indicator: render(document.getElementById('indicator')),
  };
  next();
};

export default () => {
  page('*', enrich);
  page('/', index);
  page();
};
