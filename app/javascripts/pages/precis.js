import spinner from '../lib/spinner';
import { empty } from '../lib/helpers';
import template from '../templates/precis';

export default ctx => {
  const indicator = spinner(ctx.els.indicator.el);
  indicator.run();

  const options = Object.assign({ limit: 150 }, ctx.parsed);

  ctx.collection
    .fetch(options)
    .then(empty(ctx.els.stage))
    .then(({ total, next, headings }) => {
      window.scrollTo(0, 0);

      indicator.stop();

      ctx.els.stage(template({
        params: ctx.parsed,
        headings,
        next,
        total,
      }));
    });
};
