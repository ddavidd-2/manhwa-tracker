import { validSites } from "./constants.js";
import { get, getDB, set } from "./db/db.js";

async function main() {
  /* open db connection */
  let db;
  try {
    db = await getDB();
  } catch (error) {
    console.error(error);
  }

  /* add listener */
  chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    /* only check site when completed loading */
    if (changeInfo.status === 'complete') {

      /* create manhwa object */
      let manhwaRecord;
      console.log('creating manhwa object (hopefully)');
      validSites.find((site) => {
        if (tab.url.includes(site.url)) {
          const match = tab.title.match(site.regexp);
          if (match) {
            /* create manhwa record */
            manhwaRecord = {
              title: match.groups.title,
              chapter: match.groups.chapter,
              site: site.name,
              lastRead: new Date(),
            }
            console.log('manhwa record created');
          }
        }
      });

      /* only run if manhwa is from a tracked site */
      if (manhwaRecord) {
        try {
          const stored = await get(db, manhwaRecord.title);
          console.log('manhwa retrieved');
          if (!stored) {
            console.log('manhwa not in db. adding...');
            await set(db, manhwaRecord);
          } else if (stored.chapter < manhwaRecord.chapter) {
            console.log('stored manhwa exists, updating record in db');
            await set(db, manhwaRecord);
          } else {
            console.log('db contains same manhwa with higher chapter number');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('undefined manhwa: unable to update db');
      }
    }
  });
}

main();