import spinner from '../lib/spinner';
import index from '../templates/index';
import render from '../lib/render';
import { animate } from '../lib/spinner';
import cross from '../templates/cross';

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


      const visualization = headings.map(heading => `
        <div class='visualization__cross' style='transform: rotate(${heading.value}deg);'>
          ${cross}
        </div>
      `);

      animate(visualization).run(render(document.getElementById('visualization')));
    });
};
