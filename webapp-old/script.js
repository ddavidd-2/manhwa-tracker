import { getDB, getAll } from "../db/db.js";

let currPage = 0;
let maxPages = 0;
main();

async function main() {
  const db = await getDB();
  const manhwaList = await getAll(db);
  populateList(manhwaList, 0);
  maxPages = Math.floor(manhwaList.length / 10);
  setPageButtons(0);
}

function populateList(manhwaList, page, sortFn = byMostRecent) {
  const start = page * 10;
  const end = (page + 1) * 10;
  const list = document.getElementById('manhwa-list');
  let listHTML = ``;
  manhwaList.sort(sortFn).map((m) => {
    listHTML += (`
    <div class="manhwa-wrapper">
      <h3>${m.title}</h3>
      <div>Chapter ${m.chapter}</div>
      <div>${relativeDate(m.lastRead)}</div>
      <div>${m.site}</div>
    </div>
    `);
  });
  list.innerHTML = listHTML;
}

function setPageButtons(page) {
  currPage = page;
  const buttonDiv = document.getElementById('page-buttons');
  buttonDiv.innerHTML = (`
    <button onclick={}>&#60;</button>
    <div>
      Page 0 of 1
    </div>
    <button onclick={}>&#62;</button>
  `)
}

function byMostRecent(a, b) {
  return new Date(b.lastRead) - new Date(a.lastRead);
}

/* format date */
function relativeDate(date) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  const diff = Math.round((new Date() - new Date(date)) / 1000);

  if (diff < 30) {
    return "just now";
  } else if (diff < minute) {
    return diff + " seconds ago";
  } else if (diff < 2 * minute) {
    return "a minute ago";
  } else if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  } else if (Math.floor(diff / hour) == 1) {
    return "an hour ago";
  } else if (diff < day) {
    return Math.floor(diff / hour) + " hours ago";
  } else if (diff < day * 2) {
    return "a day ago";
  } else if (diff < week) {
    return Math.floor(diff / day) + " days ago";
  } else if (diff < 2 * week) {
    return "a week ago";
  } else if (diff < month) {
    return Math.floor(diff / week) + " weeks ago";
  } else if (diff < 2 * month) {
    return "a month ago"
  } else if (diff < year) {
    return Math.floor(diff / month) + " months ago";
  } else if (diff < 2 * year) {
    return "a year ago"
  } else {
    return Math.floor(diff / year) + " years ago";
  }
}
