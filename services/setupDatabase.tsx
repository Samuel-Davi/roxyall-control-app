// // databaseSetup.js
// import * as SQLite from 'expo-sqlite';

// export async function setupDatabase() {
//   const db = await SQLite.openDatabaseAsync('roxyall-db');
//   try {
//     await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         email TEXT UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         avatar TEXT
//       );
//       CREATE TABLE IF NOT EXISTS transactions (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           user_id INTEGER NOT NULL,
//           description TEXT,
//           amount REAL,
//           date TEXT,
//           category TEXT,
//           FOREIGN KEY (user_id) REFERENCES users(id)
//       );
//       `
//     );

//     console.log('Tabelas criadas com sucesso!');
//   } catch (error) {
//     console.error('Erro ao criar tabelas:', error);
//   } 
// }
