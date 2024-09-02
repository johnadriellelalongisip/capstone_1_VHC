import { openDB } from 'idb';

const useIndexedDB = (dbName, storeNames) => {
  // Ensure storeNames is always an array
  if (!Array.isArray(storeNames)) {
    storeNames = [storeNames];
  }

  // Open the database and ensure all specified stores are created
  const dbPromise = openDB(dbName, undefined, {
    upgrade(db) {
      storeNames.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      });
    },
  });

  // Add a new record to a specific store
  const addItem = async (storeName, item) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.add(item);
    await tx.done;
  };

  // Get a record by ID from a specific store
  const getItem = async (storeName, id) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const item = await store.get(id);
    await tx.done;
    return item;
  };

  // Get all records from a specific store
  const getAllItems = async (storeName) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const allItems = await store.getAll();
    await tx.done;
    return allItems;
  };

  // Update a record by ID in a specific store
  const updateItem = async (storeName, id, newData) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const item = await store.get(id);
    if (item) {
      const updatedItem = { ...item, ...newData };
      await store.put(updatedItem);
    }
    await tx.done;
  };

  // Update a store
  const updateStore = async (storeName, newData) => {
     const db = await dbPromise;
     const tx = db.transaction(storeName, 'readwrite');
     const store = tx.objectStore(storeName);
     await store.put(newData);
  }

  // Delete a record by ID from a specific store
  const deleteItem = async (storeName, id) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(id);
    await tx.done;
  };

  return {
    addItem,
    getItem,
    getAllItems,
    updateItem,
    updateStore,
    deleteItem,
  };
};

export default useIndexedDB;
