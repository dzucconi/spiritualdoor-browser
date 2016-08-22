const spinner = '▌▀▐▄'.split('');

export const animate = set => {
  const over = (i, limit) => i + 1 < limit ? i + 1 : 0;

  let n = 0;
  let interval = null;

  return {
    run: (to, speed = 50) => {
      interval = setInterval(() => {
        to(set[n = over(n, set.length)]);
      }, speed);
    },

    stop: () => {
      clearInterval(interval);
      return true;
    }
  };
};

export default animate(spinner);
