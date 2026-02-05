import sqlite3 from 'sqlite3';
console.log('SQLite3 loaded successfully');
const db = new sqlite3.Database(':memory:');
console.log('Database created');
