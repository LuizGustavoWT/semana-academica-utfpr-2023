import Fastify from "fastify";
import AuthorController from "../controller/AuthorController.ts";

const server = Fastify({
    logger: true,
});

server.get('/', async (req, res) => {
    return res.send({
        message: "Hello World"
    });
});

server.get('/autor', AuthorController.getAllAuthors);
server.get('/autor/insert', AuthorController.insertAuthor);
server.get('/autor/bulk', AuthorController.bulkInsertAuthor);
server.get('/autor/bulk/index', AuthorController.bulkInsertAuthorWithIndex);
server.get('/autor/insert/index', AuthorController.insertAuthorWithIndex);


export {server};