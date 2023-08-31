import React from 'react';
import PageButtons from '../PageButtons';
import Configurations from '../Configurations';
import ManhwaList from '../ManhwaList';
import styles from './ListWrapper.module.css';
import { sortFns } from '../../constants';
import SearchBar from '../SearchBar/SearchBar';

function ListWrapper({ manhwaList }) {
  const [sortFn, setSortFn] = React.useState('byMostRecent');
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const filteredList = manhwaList.filter((m) => {
    return m.title.startsWith(search);
  })
  const sortedList = filteredList.sort(sortFns[sortFn]);

  const maxPage = Math.floor(filteredList.length / 10) + 1;

  function incrementPage() {
    setPage((p) => p < maxPage ? p + 1 : p);
  }

  function decrementPage() {
    setPage((p) => p > 1 ? p - 1 : p);
  }

  function handleSortFn(event) {
    setSortFn(event.target.value);
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleClear() {
    setSearch("");
  }

  return (
    <div className={styles.layout}>
      <SearchBar
        input={search}
        onChange={handleSearch}
        reset={handleClear}
      />
      <div className={styles.settings}>
        <Configurations
          sortFn={sortFn}
          setSortFn={handleSortFn}
        />
        <PageButtons
          increment={incrementPage}
          decrement={decrementPage}
          page={page}
          maxPage={maxPage}
        />
      </div>
      <ManhwaList
        manhwaList={sortedList}
        page={page}
      />
    </div>
  );

}


export default ListWrapper;
