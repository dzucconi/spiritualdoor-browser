import moment from 'moment';
import cross from './cross';
import query from '../lib/query';
import { compact, formatDate } from '../lib/helpers';

export default ({ total, next, params, headings }) => {
  const q = query(params);

  return `
    <header class='header'>
      <h1>
        ${total} headings @ ${moment()}
      </h1>

      <h2>
        ${compact([params.ip, params.fingerprint, params.referer, params.next]).join(' | ')}
      </h2>

      <nav>
        <a href='?'>Reset</a>
        ${next.cursor ? `<br><a href='?${q({ next: next.cursor })}'>Next</a>` : ''}
      </nav>
    </header>

    <!-- <div class='headings'>
      ${headings.map(heading => `
        <div class='heading'>
          <div class='heading__cross' style='transform: rotate(${heading.value}deg);'>
            ${cross}
          </div>

          <div class='heading__value'>
            <strong>${heading.value}</strong>
            <br>
            ${formatDate(heading.created_at)}
          </div>

          <div class='heading__metadata'>
            <a href='?${q({ ip: heading.ip })}'>${heading.ip}</a><br>
            <a href='?${q({ fingerprint: heading.fingerprint })}'>${heading.fingerprint}</a><br>
            <a href='?${q({ referer: heading.referer })}'>${heading.referer}</a>
          </div>
        </div>
      `).join('')}
    </div> -->
  `;
};
