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
  ]);

  return `
    <nav class='nav'>
      ${total} records
      @${compact(criteria).join('<wbr>:<wbr>') || 'Root'}${params.next ? `<wbr>:<wbr>${params.next.split(':')[0]}` : ''}

      <br>

      ${params.next ? `
        <a href='/data?${q({ next: null })}'>⇤</a>
        <a class='flip' onclick='history.back()'>➝</a>
      ` : ''}

      <a href='/'>●</a>

      ${criteria.length || params.next ? '<a href="/data">Reset</a>' : ''}

      ${next.cursor && total >= 150 ? `<a href='/data?${q({ next: next.cursor })}'>
        ➝
      </a>` : ''}

    </nav>

    <div id='visualization' class='visualization'>
      <!-- Rendered separately -->
    </div>

    <table class='headings'>
      <thead>
        <th class='heading__cell--cross'>†</th>
        <th class='heading__cell--value'>Value</th>
        <th class='heading__cell--datetime priority--secondary'>Datetime</th>
        <th class='heading__cell--fingerprint'>Fingerprint</th>
        <th class='heading__cell--ip priority--tertiary'>IP</th>
        <th class='heading__cell--ip'>Location</th>
        <!-- <th class='heading__cell--referer priority--secondary'>Referer</th> -->
      </thead>
      <tbody>
        ${headings.map(heading => {
          const timestamp = moment(heading.created_at);

          return `
            <tr class='heading'>
              <td class='heading__cell--cross'>
                <div class='heading__cross' style='transform: rotate(${heading.value}deg);'>
                  †
                </div>
              </td>

              <td class='heading__cell--value'>
                <span class='monospace'>
                  ${parseFloat(heading.value).toFixed(3)}°
                </span>
              </td>

              <td class='heading__cell--datetime priority--secondary'>
                ${timestamp.format('MM/D/YY H:mm:ss')}
              </td>

              <td class='heading__cell--fingerprint'>
                <a class='monospace' title='${heading.fingerprint}' href='/data?${q({ fingerprint: heading.fingerprint })}'>
                  ${truncate(heading.fingerprint, 7, '')}
                </a>
              </td>

              <td class='heading__cell--ip priority--tertiary'>
                <a href='/data?${q({ ip: heading.ip })}'>${heading.ip}</a>
              </td>

              <td title='${heading.location.coordinates.join(', ')}' class='heading__cell--ip'>
                ${heading.location.country}
              </td>

              <!-- <td class='heading__cell--referer priority--secondary'>
                <a href='/data?${q({ referer: heading.referer })}'>
                  ${truncate(heading.referer, 50)}
                </a>
              </td> -->
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
};
