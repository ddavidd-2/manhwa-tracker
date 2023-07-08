export const validSites = [
  {
    name: 'Asura Scans',
    url: 'asurascans.com',
    regexp: /(?<title>.*) Chapter (?<chapter>\d+) . Asura Scans/,
  },
  {
    name: 'Reaper Scans',
    url: 'reaperscans.com',
    regexp: /Chapter (?<chapter>\d+) . (?<title>.*) . Reaper Scans/,
  },
  {
    name: 'Zero Scans',
    url: 'zeroscans.com',
    regexp: /Chapter (?<chapter>\d+), (?<title>.*) • Zero Scans/,
  },
  {
    name: 'Flame Scans',
    url: 'flamescans.org',
    regexp: /(?<title>.*) Chapter (?<chapter>\d+) . Flame Scans/,
  },
  {
    name: 'Luminous Scans',
    url: 'luminousscans.com',
    regexp: /(?<title>.*) Chapter (?<chapter>\d+) . Luminous Scans/,
  },
  {
    name: 'Leviatan Scans',
    url: 'leviatanscans.com',
    regexp: /(?<title>.*) - Chapter (?<chapter>\d+) - Leviatan Scans ~/,
  }
];