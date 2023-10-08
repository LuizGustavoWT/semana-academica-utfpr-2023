import {bulkInsert, simpleInsert} from "./src/database/Database.ts";

var authors = [];

var timeInit = Date.now();

for (let i = 0; i < 100000; i++) {
    simpleInsert('Author', {
        name: `Author ${i + 100000}`
    })
    /*authors.push({
        name: `Author ${i}`
    })*/
}


//bulkInsert('Author', authors)

var timeEnd = Date.now();

console.log(`Time elapsed: ${timeEnd - timeInit}ms`);