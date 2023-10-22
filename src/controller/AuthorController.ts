import {Request, Response} from "fastify";
import {bulkInsert, getAllDataFromTable, simpleInsert} from "../database/Database.ts";
import redis from "redis";
export default class AuthorController {

    private static client = redis.createClient();

    private instance: AuthorController;

    private constructor() {}

    public static getInstance(): AuthorController {
        if (!AuthorController.instance) {
            AuthorController.instance = new AuthorController();
        }
        return AuthorController.instance;
    }

    static async getRedisClient(): Promise<redis> {
        if(!AuthorController.client.isOpen)
            await AuthorController.client.connect()
        return AuthorController.client;
    }

    static async insertAuthor(req: Request, res: Response) {

        let timeInit = Date.now();

        for (let i = 0; i < 100000; i++) {
            await simpleInsert('Author', {
                name: `Author ${i}`
            })
        }


        let timeEnd = Date.now();

        console.log(`Time elapsed: ${timeEnd - timeInit}ms`);

        return res.send({
            timeElapsed: `${timeEnd - timeInit}ms`,
            message: "Author inserted successfully"
        });
    }

    static async bulkInsertAuthor(req: Request, res: Response) {
        let timeInit = Date.now();

        let authors = [];

        for (let i = 0; i < 100000; i++) {
            authors.push({
                name: `Author ${i + 100000}`
            })
        }

        await bulkInsert('Author', authors)

        let timeEnd = Date.now();

        console.log(`Time elapsed: ${timeEnd - timeInit}ms`);

        return res.send({
            timeElapsed: `${timeEnd - timeInit}ms`,
            message: "Author inserted successfully"
        });
    }


    static async insertAuthorWithIndex(req: Request, res: Response) {

        let timeInit = Date.now();

        for (let i = 0; i < 100000; i++) {
            await simpleInsert('AuthorWithIndex', {
                name: `Author ${i}`
            })
        }


        let timeEnd = Date.now();

        console.log(`Time elapsed: ${timeEnd - timeInit}ms`);

        return res.send({
            timeElapsed: `${timeEnd - timeInit}ms`,
            message: "Author inserted successfully"
        });
    }

    static async bulkInsertAuthorWithIndex(req: Request, res: Response) {
        let timeInit = Date.now();

        let authors = [];

        for (let i = 0; i < 100000; i++) {
            authors.push({
                name: `Author ${i + 100000}`
            })
        }

        await bulkInsert('AuthorWithIndex', authors)

        let timeEnd = Date.now();

        console.log(`Time elapsed: ${timeEnd - timeInit}ms`);

        return res.send({
            timeElapsed: `${timeEnd - timeInit}ms`,
            message: "Author inserted successfully"
        });
    }


    static async getAllAuthors(req: Request, res: Response) {

        try {

            var init = Date.now();

            let rClient = await AuthorController.getRedisClient()

            let authors = await rClient.get('authors');

            if(!authors) {
                authors = await getAllDataFromTable('Author');

                if(authors.length > 0) {
                    await rClient.set('authors', JSON.stringify(authors));
                }
            }else {
                authors = JSON.parse(authors);
            }
            return res.send({
                timeElapsed: `${Date.now() - init}ms`,
                authors: authors
            });
        } catch (e) {
            console.error(e);
            return res.send({
                message: "Error"
            });
        }
    }
}