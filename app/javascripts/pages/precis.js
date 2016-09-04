import moment from 'moment';
import spinner from '../lib/spinner';
import collapse from '../lib/collapse';
import country from '../lib/country';
import {
  truncate,
  nAndThen,
  numberWord,
 } from '../lib/helpers';
import template from '../templates/precis';

const toSentence = xs => {
  const structure = collapse(xs.map(x => x.name.toLowerCase()))
    .reduce((memo, x) => {
      if (x instanceof Array) {
        memo.push(`held a bearing of ${x[0]} for ${numberWord(x.length)} seconds`);
      } else {
        memo.push(memo.length === 0 ? `faced ${x}` : `turned to face ${x}`);
      }

      return memo;
    }, []);

  return `${nAndThen(structure)}.`;
};

const get = (x, key) => {
  if (x instanceof Array) {
    return x[0][key];
  }
  return x[key];
};

const cross = heading => `<span
  class='precis__cross sans'
  style='transform: rotate(${heading.value - 90}deg);'>
  ➝
</span>`;

const summarize = headings => {
  const index = headings.reduce((memo, heading) => {
    memo[heading.fingerprint] = memo[heading.fingerprint] || [];
    memo[heading.fingerprint].push(heading);
    return memo;
  }, {});

  return Object.keys(index)
    .map((key, i) => {
      const output = [];
      const xs = index[key];

      if (i === 0) {
        output.push(`
          <p class='sans'>
            ${moment(get(index[key], 'created_at')).calendar()}
          </p>
        `);
      }

      output.push('<p>');

      const location = xs[0].location;
      if (location) {
        output.push(`In ${country(location.country)}`);
      }

      output.push(`
        <a
          class='monospace'
          href='/data?fingerprint=${key}'>${
            truncate(key, 7, '')
          }</a>
          ${toSentence(index[key])}`
      );
      output.push('</p>');

      output.push(`<p>${cross(xs[xs.length - 1])}</p>`);

      return output.join('');
    }).join('');
};

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
        precis: summarize(headings),
        next,
        total,
      }));
    });
};
