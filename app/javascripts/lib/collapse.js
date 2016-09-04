import { last } from './helpers';

/**
 * Group consecutive values into arrays
 * [1, 2, 2, 3, 3, 3, 4, 3] =>
 *   [1, [2, 2], [3, 3, 3], 4, 3]
 * @param {Array}
 * @return {Array}
 */
export default xs =>
  xs.reduce((memo, x) => {
    const prev = last(memo);

    if (prev instanceof Array) {
      (prev[0] === x ? prev : memo)
        .push(x);

    } else if (prev === x) {
      const y = [memo.pop()];
      y.push(x);
      memo.push(y);

    } else {
      memo.push(x);
    }

    return memo;
  }, []);
