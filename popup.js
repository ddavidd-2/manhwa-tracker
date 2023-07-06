async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab;
}

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

/* on load */
const titleSelector = document.querySelector('#title');
const chapterSelector = document.querySelector('#chapter');
const siteSelector = document.querySelector('#site');

const tab = await getCurrentTab();
validSites.find((site) => {
  if (tab.url.includes(site.url)) {
    const match = tab.title.match(site.regexp);
    if (match) {
      titleSelector.innerHTML = match.groups.title;
      chapterSelector.innerHTML = `Chapter ${match.groups.chapter}`;
      siteSelector.innerHTML = site.name;
    } else {
      titleSelector.innerHTML = 'Select a Manhwa to start tracking';
      chapterSelector.innerHTML = 'Chapter N/A';
      siteSelector.innerHTML = `Currently on ${site.name}`;
    }
  }
});