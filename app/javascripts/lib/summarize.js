import collapse from '../lib/collapse';
import country from '../lib/country';
import {
  compact,
  truncate,
  nAndThen,
  numberWord,
  indexBy,
} from './helpers';

const steps = session => {
  const collapsed = collapse(session.map(({ name }) => name.toLowerCase()));

  return collapsed.reduce((memo, x) => {
    if (x instanceof Array) {
      memo.push(`maintained a heading of ${x[0]} for ${numberWord(x.length)} seconds`);
    } else {
      memo.push(memo.length === 0 ? `faced ${x}` : `turned to face ${x}`);
    }
    return memo;
  }, []);
};

const place = session => {
  const location = session[0].location;
  if (location && location.country) return `In ${country(location.country)}`;
  return;
};

const precis = (key, session) =>
  compact([
    // Conditionally identify location
    place(session),

    // Identify person
    `<span class='precis__fingerprint'>${truncate(key, 7, '')}</span>`,

    // Summarize directional steps
    `${nAndThen(steps(session))}.`,
  ]).join(' ');

export default headings => {
  const sessions = indexBy(headings, 'fingerprint');
  return Object.keys(sessions).map(key => precis(key, sessions[key]));
};
