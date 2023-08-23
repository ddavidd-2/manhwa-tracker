export function getDB() {
  return new Promise((resolve, reject) => {
    let db;
    const dbName = 'ManhwaDB';
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => {
      reject('error opening database');
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log('db object initialized');
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      const objectStore = db.createObjectStore('manhwa', {
        keyPath: 'title',
      });
      objectStore.createIndex('lastRead', 'lastRead');
      objectStore.createIndex('site', 'site', {
        unique: false,
      });
      console.log('db upgrade triggered');
    };
  });
}

export function get(db, key) {
  return new Promise((resolve, reject) => {
    /* open transaction */
    const transaction = db.transaction(['manhwa'], 'readonly');
    transaction.oncomplete = () => {
      console.log('transaction successfully opened');
    }
    transaction.onerror = () => {
      console.log('get transaction failed');
      reject('error opening transaction');
    }

    /* open store */
    const store = transaction.objectStore('manhwa');

    /* open request */
    const storeRequest = store.get(key);

    storeRequest.onsuccess = () => {
      console.log('successfully retrieved manhwa record');
      resolve(storeRequest.result);
    }

    storeRequest.onerror = () => {
      reject('error retrieving manhwa from db');
    }
  })
}

export function set(db, value) {
  return new Promise((resolve, reject) => {
    /* open transaction */
    const transaction = db.transaction(['manhwa'], 'readwrite');
    transaction.oncomplete = () => {
      console.log('transaction successfully opened');
    }

    transaction.onerror = () => {
      reject('error opening transaction');
    }
    
    /* open store */
    const store = transaction.objectStore('manhwa');

    /* open store request */
    const storeRequest = store.put(value);

    storeRequest.onsuccess = () => {
      resolve('successfully updated db');
    }

    storeRequest.onerror = () => {
      reject('error updating db');
    }
  })
}

export function getAll(db) {
  return new Promise((resolve, reject) => {
    /* open transaction */
    const transaction = db.transaction(['manhwa'], 'readwrite');
    transaction.oncomplete = () => {
      console.log('transaction successfully opened');
    }

    transaction.onerror = () => {
      reject('error opening transaction');
    }
    
    /* open store */
    const store = transaction.objectStore('manhwa');

    /* open store request */
    const storeRequest = store.getAll();

    storeRequest.onsuccess = () => {
      console.log('successfully retrieved all data');
      resolve(storeRequest.result);
    }

    storeRequest.onerror = () => {
      reject('error retrieving all data');
    }
  })

}