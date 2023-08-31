import React from 'react';
import { relativeDate } from '../../utils';
import styles from './Manhwa.module.css';
import { siteLinks } from '../../constants';

function Manhwa({ title, chapter, lastRead, site }) {
  return (
    <div
      className={styles.manhwaWrapper}
    >
      <div className={styles.titleChapter}>
        <h3>{title}</h3>
        <div>Chapter {chapter}</div>
      </div>
      <div className={styles.dateSite}>
        <div>{relativeDate(lastRead)}</div>
        <a href={siteLinks[site]} className={styles.siteLink} target="_blank">{site}</a>
      </div>
    </div>
  );
}

export default Manhwa;
