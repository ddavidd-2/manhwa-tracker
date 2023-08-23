import { getDB, getAll } from "../db/db.js";

async function main() {
  const db = await getDB();
  const manhwaList = await getAll(db);

  const list = document.getElementById('manhwaList');
  manhwaList.map((m) => {
    list.innerHTML += `<li>${m.title}</li>`;
  })
  console.log(manhwaList);
}

main();