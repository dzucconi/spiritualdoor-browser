import moment from 'moment';
import summarize from '../lib/summarize';
import query from '../lib/query';

export default ({ params, total, next, headings }) => {
  const q = query(params);

  next.id = next.cursor && next.cursor.split(':')[1];
  next.id = next.id && next.id.substr(next.id.length - 7, next.id.length);

  return `
    <nav class='nav'>
      ${moment(headings[0].created_at).calendar()}<br>

      ${params.next ? `
        <a href='/?${q({ next: null })}'>⇤</a>
        <a class='flip' onclick='history.back()'>➝</a>
      ` : ''}

      <a href='/data'>●</a>

      ${next.cursor && total >= 150 ? `
        <a href='/?${q({ next: next.cursor })}'>➝</a>
      ` : ''}
    </nav>

    <div class='precis'>
      ${summarize(headings).join(' ')}
    </div>
  `;
};
