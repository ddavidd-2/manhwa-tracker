const validSites = [
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
    regexp: /Chapter (?<chapter>\d+), (?<title>.*) . Zero Scans/,
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
    regexp: /(?<title>.*) - Chapter (?<chapter>\d+) - Luminous Scans ~/,
  }
];

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  /* only check site when completed loading */
  if (changeInfo.status === 'complete') {
    validSites.find((site) => {
      if (tab.url.includes(site.url)) {
        const match = tab.title.match(site.regexp);
        if (match) {
          console.log(`title: ${match.groups.title}, chapter ${match.groups.chapter}`);
        }
      }
    });
  }
}) ;