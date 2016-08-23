import moment from 'moment';
import query from '../lib/query';
import {
  compact,
  truncate,
  pluck,
} from '../lib/helpers';

export default ({ total, next, params, headings }) => {
  const q = query(params);
  const criteria = pluck(params, [
    'ip',
    'fingerprint',
    'referer',
    'next',
  ]);

  return `
    <header class='header'>
      ${total} headings @
      ${compact(criteria).join(', ') || 'root'}
      ${criteria.length ? '<a href="?">&lt;reset&gt;</a>' : ''}
      <br>
      ${next.cursor ? `<a href='?${q({ next: next.cursor })}'>&lt;forward&gt;</a>` : ''}
    </header>

    <div id='visualization' class='visualization'>
      <!-- Rendered separately -->
    </div>

    <table class='headings'>
      <thead>
        <th class='heading__cell--cross'>†</th>
        <th class='heading__cell--value'>Value</th>
        <th class='heading__cell--datetime'>Datetime</th>
        <th class='heading__cell--fingerprint'>Fingerprint</th>
        <th class='heading__cell--ip'>IP</th>
        <th class='heading__cell--referer'>Referer</th>
      </thead>
      <tbody>
        ${headings.map(heading => `
          <tr class='heading'>
            <td class='heading__cell--cross'>
              <div class='heading__cross' style='transform: rotate(${heading.value}deg);'>
                †
              </div>
            </td>

            <td class='heading__cell--value'>
              ${heading.value}°
            </td>

            <td class='heading__cell--datetime'>
              ${moment(heading.created_at).format('MMMM D, YYYY, h:mm:ss a')}
            </td>

            <td class='heading__cell--fingerprint'>
              <a class='monospace' href='?${q({ fingerprint: heading.fingerprint })}'>${heading.fingerprint}</a>
            </td>

            <td class='heading__cell--ip'>
              <a href='?${q({ ip: heading.ip })}'>${heading.ip}</a>
            </td>

            <td class='heading__cell--referer'>
              <a href='?${q({ referer: heading.referer })}'>
                ${truncate(heading.referer, 50)}
              </a>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};
