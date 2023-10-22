import {Database} from 'bun:sqlite';
import * as path from "path";
import {dirname} from "path/posix";

const DB = Database.open(path.resolve( 'dev.db'));

async function run(query) {
    try {
        await DB.run(query);
    }catch (e) {
        console.error(e);
    }
}

async function simpleInsert(table, data) {
    var keys = Object.keys(data);
    var values = Object.values(data);
    var query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.map(v => `'${v}'`).join(', ')})`;
    await run(query)
}

async function bulkInsert(table, data) {
    var keys = Object.keys(data[0]);
    var values = data.map(v => `(${Object.values(v).map(v => `'${v}'`).join(', ')})`);
    var query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES ${values.join(', ')}`;
    await run(query);
}

async function getAllDataFromTable(table) {
    var query = DB.prepare(`SELECT * FROM ${table}`);
    return query.all();
}

async function findByQuery(query) {
    const sql = DB.prepare(query);
    const result = await sql.all();
    console.log(result);
    return [];
}

async function getAllDataFromTable(table) {
    var query = DB.prepare(`SELECT * FROM ${table}`);
    return query.all();
}


export {
    DB,
    run,
    simpleInsert,
    bulkInsert,
    getAllDataFromTable,
    findByQuery
}