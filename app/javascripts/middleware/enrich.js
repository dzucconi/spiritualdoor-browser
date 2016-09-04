import qs from '../lib/qs';
import render from '../lib/render';
import Headings from '../collections/headings';
import { wait } from '../lib/helpers';

export default (ctx, next) => {
  wait()
    .then(() => {
      ctx.collection = new Headings;
      ctx.parsed = qs.parse(location.hash.split('?')[1]);
      ctx.els = {
        stage: render(document.getElementById('stage')),
        indicator: render(document.getElementById('indicator')),
      };

      next();
    });
};
