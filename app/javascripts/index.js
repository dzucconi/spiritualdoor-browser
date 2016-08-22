import page from 'page';
import qs from './lib/qs';
import { wait } from './lib/helpers';
import Headings from './collections/headings';
import index from './pages/index';
import render from './lib/render';

const headings = new Headings;

const enrich = (ctx, next) =>
  wait()
    .then(() => {
      ctx.collection = headings;
      ctx.parsed = qs.parse(location.search.slice(1));
      ctx.els = {
        stage: render(document.getElementById('stage')),
        indicator: render(document.getElementById('indicator')),
      };

      next();
    });

export default () => {
  page('*', enrich);
  page('/', index);
  page();
};
