import query from '../lib/query';

export default ({ params, total, next, precis }) => {
  const q = query(params);

  next.id = next.cursor && next.cursor.split(':')[1];
  next.id = next.id && next.id.substr(next.id.length - 7, next.id.length);

  return `
    ${next.cursor && total >= 150 ? `
      <a class='next' href='/?${q({ next: next.cursor })}'>
        ➝
      </a>
    ` : ''}

    <div class='precis'>
      <section class='precis__body'>
        ${precis}
      </section>

      ${next.cursor ? `
        <footer class='precis__footer sans'>
          ${params.next ? `
            <a href='/?${q({ next: null })}'>
              First
            </a>
            <br>

            <a onclick='history.back()'>
              Previous
            </a>
            <br>
          ` : ''}
          <a title='${next.id}' href='/?${q({ next: next.cursor })}'>
            Next
          </a>

          <br>
          <br>
          <a href='/data'>
            Index
          </a>
        </footer>
      ` : ''}
    </div>
  `;
};
