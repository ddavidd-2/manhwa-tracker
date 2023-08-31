import React from 'react';
import Manhwa from '../Manhwa';

function ManhwaList({ manhwaList, page }) {
  if (!manhwaList) {
    return <></>;
  }
  const start = (page - 1) * 10;
  const end = page * 10;

  return (
    <div>
      {manhwaList.slice(start, end).map((manhwa) => {
        return (
          <Manhwa
            key={manhwa.title}
            {...manhwa}
          />
        );
      })}
    </div>
  )
}

export default ManhwaList;
