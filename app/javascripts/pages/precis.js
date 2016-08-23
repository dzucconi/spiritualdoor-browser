import spinner from '../lib/spinner';
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

const collapse = headings => {
  return headings.reduce((memo, z) => {
    const x = last(memo);

    if (x instanceof Array) {
      (x[0] === z) ? x.push(z) : memo.push(z);

    } else if (x === z) {

      const y = [memo.pop()];
      y.push(z);
      memo.push(y);

    } else {

      memo.push(z);

    }

    return memo;
  }, []);
};

const summarize = headings => {
  const index = headings.reduce((memo, heading) => {
    memo[heading.fingerprint] = memo[heading.fingerprint] || [];
    memo[heading.fingerprint].push(heading.name.toLowerCase());
    return memo;
  }, {});

  return Object.keys(index)
    .map(key => `
      <a href='/data?fingerprint=${key}'>${
        truncate(key, 7, '')
      }</a>
      ${toSentence(index[key])}
    `).join('<br><br>');
};

const template = ({ next, precis }) => `
  <div class='precis'>
    <p>${precis}</p>

    ${next.cursor ? `
      <footer class='precis__footer'>
        <br>
        <a href='/?next=${next.cursor}'>
          What else?
        </a>
      </footer>
    ` : ''}
  </div>
`;

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
        next,
        precis: summarize(headings),
      }));
    });
};
