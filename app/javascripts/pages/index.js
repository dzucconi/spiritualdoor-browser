import spinner from '../lib/spinner';
import index from '../templates/index';

export default ctx => {
  spinner.run(ctx.els.indicator);

  const options = Object.assign({ limit: 150 }, ctx.parsed);

  ctx.collection
    .fetch(options)
    .then(({ total, next, headings }) => {
      spinner.stop();

      ctx.els.stage(index({
        params: ctx.parsed,
        total,
        next,
        headings,
      }));
    });
};
