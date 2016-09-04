import query from '../lib/query';
import { pluck } from '../lib/helpers';

export default (ctx, next) => {
  ctx.filter = {
    criteria: pluck(ctx.parsed, [
      'ip',
      'fingerprint',
      'referer',
    ]),

    query: query(ctx.parsed),
  };

  next();
};
