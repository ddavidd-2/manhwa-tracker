import { validSites } from "./constants.js";

const dbName = 'ManhwaDB';
let db;
const request = indexedDB.open(dbName, 1);

request.onerror = (event) => {
  console.error('error occured opening indexedDB database');
};

request.onsuccess = (event) => {
  db = event.target.result;
};

request.onupgradeneeded = (event) => {
  db = event.target.result;
  const objectStore = db.createObjectStore('manhwa', { keyPath: 'title' });
  objectStore.createIndex('lastRead', 'lastRead', { unique: true });
  objectStore.createIndex('site', 'site', { unique: false });
};


chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  /* only check site when completed loading */
  if (changeInfo.status === 'complete') {
    console.log(validSites);
    validSites.find((site) => {
      if (tab.url.includes(site.url)) {
        const match = tab.title.match(site.regexp);
        if (match) {
          /* create manhwa record */
          const manhwaRecord = { 
            title: match.groups.title, 
            chapter: match.groups.chapter, 
            site: site.name, 
            lastRead: new Date()
          }

          /* create transaction object */
          const transaction = db.transaction(['manhwa'], 'readwrite');
          transaction.oncomplete = (event) => {
            console.log('transaction complete');
          }
          transaction.onerror = (event) => {
            console.error('transaction error');
          }

          /* accessing object store */
          const store = transaction.objectStore('manhwa');

          /* retrieve specific manhwa */
          const manhwaRequest = store.get(manhwaRecord.title);
          manhwaRequest.onsuccess = () => {
            const storedManhwa = manhwaRequest.result;
            console.log('retrieved stored manhwa data');

            /* update if manhwa current not in db or current chapter > stored chapter */
            if (!storedManhwa || manhwaRecord.chapter > storedManhwa.chapter) {
              /* update db with new chapter and date */
              const updateRequest = store.put(manhwaRecord);
              updateRequest.onsuccess = (event) => {
                console.log('updated manhwa data');
              }
              updateRequest.onerror = (event) => {
                console.error(`error updating ${manhwaRecord.title} data in db`);
              }
            }
          }
          manhwaRequest.onerror = (event) => {
            console.error('error retrieving stored manhwa data');
          }

        }
      }
    });
  }
});


