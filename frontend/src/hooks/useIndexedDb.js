import { openDB } from 'idb';

const useIndexedDB = () => {
  const dbName = "Database";
  let storeNames = ["tokens"];
  if (!Array.isArray(storeNames)) {
    storeNames = [storeNames];
  }

  const dbPromise = openDB(dbName, undefined, {
    upgrade(db) {
      storeNames.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      });
    },
  });

  const addItem = async (storeName, value, key) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      await store.put(value, key);
      await tx.done;
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const clearStore = async (storeName) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      await store.clear();
      await tx.done;
    } catch (error) {
      console.error('Failed to clear store:', error);
    }
  };

  const getItem = async (storeName, id) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const item = await store.get(id);
      await tx.done;
      return item;
    } catch (error) {
      console.error('Failed to get item:', error);
    }
  };

  const getAllItems = async (storeName) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const keys = await store.getAllKeys();
      const values = await store.getAll();
      await tx.done;
      const result = {};
      keys.forEach((key, index) => {
        result[key] = values[index];
      });
      return result;
    } catch (error) {
      console.error('Failed to get all items:', error);
    }
  };

  const updateItem = async (storeName, key, newData) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const item = await store.get(key);
      if (item) {
        await store.put(newData, key);
      }
      await tx.done;
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const deleteItem = async (storeName, id) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      await store.delete(id);
      await tx.done;
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return {
    addItem,
    getItem,
    getAllItems,
    updateItem,
    deleteItem,
    clearStore
  };
};

export default useIndexedDB;