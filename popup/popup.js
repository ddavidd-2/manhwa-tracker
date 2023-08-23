import { validSites } from "../constants.js";

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab;
}

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

document.getElementById('webapp-button').onclick = () => {
  chrome.tabs.create({url: '../webapp/index.html'});
};
