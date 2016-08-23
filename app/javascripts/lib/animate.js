export default frames => {
  const over = (i, limit) => i + 1 < limit ? i + 1 : 0;

  let n = 0;
  let interval = null;

  return {
    run: (to, speed = 50) => {
      interval = setInterval(() => {
        to(frames[n = over(n, frames.length)]);
      }, speed);
    },

    stop: () => {
      clearInterval(interval);
      return true;
    }
  };
};
