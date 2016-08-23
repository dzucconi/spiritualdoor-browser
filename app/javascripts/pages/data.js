import spinner from '../lib/spinner';
import render from '../lib/render';
import animate from '../lib/animate';
import cross from '../templates/cross';
import template from '../templates/data';

export default ctx => {
  const indicator = spinner(ctx.els.indicator.el);
  indicator.run();

  const options = Object.assign({ limit: 150 }, ctx.parsed);

  ctx.collection
    .fetch(options)
    .then(({ total, next, headings }) => {
      window.scrollTo(0, 0);

      indicator.stop();

      ctx.els.stage(template({
        params: ctx.parsed,
        total,
        next,
        headings,
      }));

      if (headings.length === 0) return;

      const visualization = headings.map(heading => `
        <div
          class='visualization__cross'
          style='transform: rotate(${heading.value}deg);'>
          ${cross}
        </div>
      `);

      const visualizer = document.getElementById('visualization');

      animate(visualization)
        .run(render(visualizer));
    });
};
