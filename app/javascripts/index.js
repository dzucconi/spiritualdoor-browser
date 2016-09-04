import page from 'page';

// Pages
import data from './pages/data';
import precis from './pages/precis';

// Middleware
import enrich from './middleware/enrich';
import filter from './middleware/filter';

export default () => {
  page('*',
    enrich,
    filter
  );

  // Routes
  page('/', precis);
  page('/data', data);

  page({
    hashbang: true,
  });
};
