export const siteLinks = {
  'Asura Scans': 'https://asuracomics.com',
  'Reaper Scans': 'https://reaperscans.com',
  'Zero Scans': 'https://zeroscans.com',
  'Flame Scans': 'https://flamescans.org',
  'Luminous Scans': 'https://luminousscans.com',
  'Leviatan Scans': 'https://leviatanscans.com',
}

export const sortFns = {
  'byMostRecent': byMostRecent,
  'byLeastRecent': byOldest,
  'byTitle': byTitle,
  'byTitleReverse': byTitleReverse,
}

function byMostRecent(a, b) {
  return new Date(b.lastRead) - new Date(a.lastRead);
}

function byOldest(a, b) {
  return new Date(a.lastRead) - new Date(b.lastRead);
}

function byTitle(a, b) {
  return a.title.localeCompare(b.title);
}

function byTitleReverse(a, b) {
  return b.title.localeCompare(a.title);
}