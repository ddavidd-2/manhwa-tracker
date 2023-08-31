import React from 'react';
import styles from './Configurations.module.css';

function Configurations({ sortFn, setSortFn }) {

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>Sort by:</label>  
      {' '}
      <select
        className={styles.sortSelect}
        value={sortFn}
        onChange={setSortFn}
      >
        <option value='byMostRecent'>Most Recent</option>
        <option value='byLeastRecent'>Least Recent</option>
        <option value='byTitle'>Title &#40;A-Z&#41;</option>
        <option value='byTitleReverse'>Title &#40;Z-A&#41;</option>
      </select>
    </form>
  )
}

export default Configurations;
