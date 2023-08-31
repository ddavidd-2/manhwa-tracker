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
          }
        }
      });

      /* only run if manhwa is from a tracked site */
      if (manhwaRecord) {
        try {
          const stored = await get(db, manhwaRecord.title);
          if (!stored) {
            await set(db, manhwaRecord);
          } else if (stored.chapter < manhwaRecord.chapter) {
            await set(db, manhwaRecord);
          }        
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
}

main();