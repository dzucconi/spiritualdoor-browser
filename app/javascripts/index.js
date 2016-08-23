import page from 'page';
import qs from './lib/qs';
import { wait } from './lib/helpers';
import Headings from './collections/headings';
import data from './pages/data';
import precis from './pages/precis';
import render from './lib/render';

const headings = new Headings;

const enrich = (ctx, next) =>
  wait()
    .then(() => {
      ctx.collection = headings;
      ctx.parsed = qs.parse(location.hash.split('?')[1]);
      ctx.els = {
        stage: render(document.getElementById('stage')),
        indicator: render(document.getElementById('indicator')),
      };

      next();
    });

export default () => {
  page('*', enrich);
  page('/', precis);
  page('/data', data);
  page({
    hashbang: true,
  });
};
