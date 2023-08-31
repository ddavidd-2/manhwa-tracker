import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ input, onChange, reset }) {
  return (
    <form className={styles.form}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search by name..."
        value={input}
        onChange={onChange}
      />
      <button
        disabled={!input}
        onClick={reset}
        className={styles.clearButton}
      >
        x
      </button>
    </form>
  );
}

export default SearchBar;
