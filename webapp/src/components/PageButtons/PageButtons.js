import React from 'react';
import styles from './PageButton.module.css';
import Button from '../Button';

function PageButtons({ increment, decrement, page, maxPage }) {
  return (
    <div className={styles.buttonWrapper}>
      <Button
        onClick={decrement}
      >
        &#60;
      </Button>
      <div>{page} of {maxPage}</div>
      <Button
        onClick={increment}
      >
        &#62;
      </Button>
    </div>
  );
}

export default PageButtons;
