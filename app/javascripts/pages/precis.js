import moment from 'moment';
import spinner from '../lib/spinner';
import animate from '../lib/animate';
import { truncate } from '../lib/helpers';

const number = n =>
  ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][n] || n;

const nAndThen = xs =>
  xs.join(', ').replace(/,\s([^,]+)$/, ', and then $1');

const toSentence = xs => {
  const structure = collapse(xs)
    .reduce((memo, x) => {
      if (x instanceof Array) {
        memo.push(`held a bearing of ${x[0]} for ${number(x.length)} seconds`);
      } else {
        memo.push(memo.length === 0 ? `faced ${x}` : `turned to face ${x}`);
      }

      return memo;
    }, []);

  return `${nAndThen(structure)}.`;
};

const last = xs =>
  xs[xs.length - 1];

const get = (x, key) => {
  if (x instanceof Array) {
    return x[0][key];
  }
  return x[key];
};

const collapse = headings => {
  return headings.reduce((memo, heading) => {
    const x = last(memo);
    const name = heading.name.toLowerCase();

    if (x instanceof Array) {
      (x[0] === name) ? x.push(name) : memo.push(name);
    } else if (x === name) {
      const y = [memo.pop()];
      y.push(name);
      memo.push(y);
    } else {
      memo.push(name);
    }

    return memo;
  }, []);
};

const cross = heading => `<span
  class='precis__cross sans'
  style='transform: rotate(${heading.value}deg);'>†
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
            ${moment(get(index[key], 'created_at')).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </p>
        `);
      }

      output.push('<p>');

      const location = xs[0].location;
      if (location) {
        output.push(`Near ${location.city}, ${location.country},`);
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

const template = ({ params, next, precis }) => {
  next.id = next.cursor && next.cursor.split(':')[1];
  next.id = next.id && next.id.substr(next.id.length - 7, next.id.length);

  return `
    <div class='precis'>
      <section class='precis__body'>
        ${precis}
      </section>

      ${next.cursor ? `
        <footer class='precis__footer sans'>
          <a href='/'>${params.next ? 'Beginning' : 'Again'}</a>
          or
          <a href='/?next=${next.cursor}'>
            More?
            (<span class='monospace'>${next.id}</span>)
          </a>
        </footer>
      ` : ''}
    </div>
  `;
};

export default ctx => {
  const indicator = spinner(ctx.els.indicator.el);
  indicator.run();

  const options = Object.assign({ limit: 150 }, ctx.parsed);

  ctx.collection
    .fetch(options)
    .then(({ next, headings }) => {
      window.scrollTo(0, 0);

      indicator.stop();

      ctx.els.stage(template({
        params: ctx.parsed,
        next,
        precis: summarize(headings),
      }));
    });
};
