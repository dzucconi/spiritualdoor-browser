const needsArticle = [
  'Bahamas',
  'Cayman Islands',
  'Central African Republic',
  'Channel Islands',
  'Comoros',
  'Czech Republic',
  'Dominican Republic',
  'Falkland Islands',
  'Gambia',
  'Isle of Man',
  'Ivory Coast',
  'Leeward Islands',
  'Maldives',
  'Maldive Islands',
  'Marshall Islands',
  'Netherlands',
  'Antilles',
  'Philippines',
  'Solomon Islands',
  'Turks and Caicos',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Virgin Islands',
  'Barbados',
  'Cook Islands',
  'Seychelles',
  'Grenadines'
];

const isInNeedOfArticle = x =>
  needsArticle.indexOf(x) >= 0;

export default x =>
  isInNeedOfArticle(x) ? `the ${x}` : x;
