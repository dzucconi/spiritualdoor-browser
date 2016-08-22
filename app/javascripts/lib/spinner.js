const spinner = '▌▀▐▄'.split('');

const over = (i, limit) =>
  i + 1 < limit ? i + 1 : 0;

let n = 0;
let interval = null;

export default {
  run: (to, speed = 50) => {
    interval = setInterval(() => {
      to(spinner[n = over(n, spinner.length)]);
    }, speed);
  },

  stop: () => {
    clearInterval(interval);
    return true;
  }
};
