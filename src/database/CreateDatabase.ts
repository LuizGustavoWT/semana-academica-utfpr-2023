import {run} from "./Database.ts";

const authorDDL = `
    CREATE TABLE IF NOT EXISTS 'Author' (
    'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    'name' TEXT NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`

run(authorDDL);