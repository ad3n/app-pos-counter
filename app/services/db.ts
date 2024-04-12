// db.js
import Dexie from 'dexie';

export const db = new Dexie('pcellDb');
db.version(1).stores({
  auth:'++id, token, user'
});