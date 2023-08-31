import React from "react";
import styles from "./App.module.css";
import { getAll, getDB } from './db';

import ListWrapper from "./components/ListWrapper";


function App() {
  const [manhwaList, setManhwaList] = React.useState(
    [
      {
        title: 'You have no manhwa tracked',
        chapter: 0,
        lastRead: new Date(),
        site: 'None',
      },
      {
        title: 'Head to one of the supported sites read a manhwa to begin tracking',
        chapter: 0,
        lastRead: new Date(),
        site: 'Asura Scans, Reaper Scans, Luminous Scans, Flame Scans, Leviatan Scans, Zero Scans',
      }
    ]
  );

  React.useEffect(() => {
    getDB()
      .then((db) => getAll(db))
      .then((manhwas) => {
        if (manhwas.length > 0) {
          setManhwaList(manhwas);
        }
      })
  }, [setManhwaList])

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>All Manhwa</h2>
      <ListWrapper
        manhwaList={manhwaList}
      />
    </div>
  );
}

export default App;
