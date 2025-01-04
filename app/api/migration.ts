import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
   db.run(
    `
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
      );
    `,
    (err: Error) => {
     if (err) {
      console.error(err.message);
     }
     console.log("todo table created successfully.");
    }
   );
  });
}