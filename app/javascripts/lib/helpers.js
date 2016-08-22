export const formatDate = timestamp => {
  const d = new Date(timestamp);
  return `
    ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}<br>
    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
  `;
};

export const compact = arr => arr.filter(x => !!x);
