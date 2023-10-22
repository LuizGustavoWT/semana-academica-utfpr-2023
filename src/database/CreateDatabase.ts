import {findByQuery, run} from "./Database.ts";

const dropDDL = `
    DROP TABLE IF EXISTS 'Author';
    DROP TABLE IF EXISTS 'AuthorWithIndex';
    DROP TABLE IF EXISTS 'Livros';
    DROP TABLE IF EXISTS 'LivrosWrongIndex';
`;

await run(dropDDL);

const authorDDL = `
    CREATE TABLE IF NOT EXISTS 'Author' (
    'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    'name' TEXT NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`

await run(authorDDL);

const authorManyIndexDDL = `
    CREATE TABLE IF NOT EXISTS 'AuthorWithIndex' (
        'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        'name' TEXT NOT NULL,
        'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS 'idx_name' ON AuthorWithIndex(name);
    CREATE INDEX IF NOT EXISTS 'idx_created_at' ON AuthorWithIndex(created_at);
    CREATE INDEX IF NOT EXISTS 'idx_id' ON AuthorWithIndex(id);
    CREATE INDEX IF NOT EXISTS 'idx_name_created_at' ON AuthorWithIndex(name, created_at);
    CREATE INDEX IF NOT EXISTS 'idx_created_at_name' ON AuthorWithIndex(created_at, name);
    CREATE INDEX IF NOT EXISTS 'idx_name_id' ON AuthorWithIndex(name, id);
    CREATE INDEX IF NOT EXISTS 'idx_id_name' ON AuthorWithIndex(id, name);
    CREATE INDEX IF NOT EXISTS 'idx_created_at_id' ON AuthorWithIndex(created_at, id);
    CREATE INDEX IF NOT EXISTS 'idx_id_created_at' ON AuthorWithIndex(id, created_at);
    CREATE INDEX IF NOT EXISTS 'idx_name_created_at_id' ON AuthorWithIndex(name, created_at, id);
    CREATE INDEX IF NOT EXISTS 'idx_name_id_created_at' ON AuthorWithIndex(name, id, created_at);
    CREATE INDEX IF NOT EXISTS 'idx_created_at_name_id' ON AuthorWithIndex(created_at, name, id);
    CREATE INDEX IF NOT EXISTS 'idx_created_at_id_name' ON AuthorWithIndex(created_at, id, name);
    CREATE INDEX IF NOT EXISTS 'idx_id_name_created_at' ON AuthorWithIndex(id, name, created_at);
    CREATE INDEX IF NOT EXISTS 'idx_id_created_at_name' ON AuthorWithIndex(id, created_at, name);
`

await run(authorManyIndexDDL);

/*const bookDDL = `
    CREATE TABLE  IF NOT EXISTS  'Livros' (
        LivroID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        Titulo TEXT,
        AnoPublicacao INT,
        Genero TEXT,
        AutorNome TEXT,
        AutorNacionalidade TEXT,
        Editora TEXT,
        Paginas INT,
        ISBN TEXT,
        Avaliacao FLOAT,
        Preco DECIMAL(10, 2),
        DataPublicacao DATE,
        VendaStatus TEXT,
        Comentario TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

await run(bookDDL);


const bookDDLWrongIndex = `
    CREATE TABLE IF NOT EXISTS 'LivrosWrongIndex' (
        livro_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        ano_publicacao INT,
        genero TEXT,
        autor_nome TEXT,
        autor_nacionalidade TEXT,
        editora TEXT,
        paginas INT,
        isbn TEXT,
        avaliacao FLOAT,
        preco DECIMAL(10, 2),
        data_publicacao DATE,
        venda_status TEXT,
        comentario TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

await run(bookDDLWrongIndex);


const tmpTableIdx = `
CREATE TEMPORARY TABLE IF NOT EXISTS index_columns AS
        SELECT name
        FROM pragma_table_info('LivrosWrongIndex');
`;

await run(tmpTableIdx);

/*
const bookDDLIndexList = `
    WITH RECURSIVE
        combinations AS (
            SELECT 1 AS n, name AS column_name FROM index_columns
            UNION ALL
            SELECT n + 1, combinations.column_name || ',' || index_columns.name
            FROM combinations, index_columns
            WHERE n < (SELECT COUNT(*) FROM index_columns)
              AND NOT INSTR(',' || combinations.column_name || ',', ',' || index_columns.name || ',')
        )
    SELECT * FROM combinations;
`;

const index = await findByQuery(bookDDLIndexList)*/

/*index.forEach(async (v: any) => {
    await run(`
        DROP INDEX IF EXISTS idx_${v.column_name.replace(',', '_')};
        CREATE INDEX IF NOT EXISTS idx_${v.column_name} ON LivrosWrongIndex(${v.column_name.replace(',', '_')})
    `);
});*/