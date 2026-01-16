import * as fs from 'fs';
import * as sqlite from "sqlite"
import sqlite3 from "sqlite3"
import { Database as TDatabase } from "./database.js"

type DatabaseOptions = {
    path: string,
    startup_script?: string
    clear?: boolean
}

export class Database extends TDatabase{
    _db: sqlite.Database<sqlite3.Database, sqlite3.Statement> | undefined = undefined;

    constructor(options?: DatabaseOptions){
        options = {
            path: "./db.sqlite",
            ...options
        }
        super();

        let startup = "";
        if(options.startup_script){
            startup = fs.readFileSync(options.startup_script, "utf-8");
        }

        sqlite.open({
            filename: options.path,
            driver: sqlite3.Database
        }).then((db) => {
            if(options.clear){
                db.exec(`
                    PRAGMA writable_schema = 1;
                    DELETE FROM sqlite_master WHERE type = 'table'; -- Deletes all tables
                    PRAGMA writable_schema = 0;
                    VACUUM;
                `)
            }
            db.exec(startup);
            this._db = db;
        })
    }

    async query<T = unknown>(sql: string, values?: any[]): Promise<T> {
        return this._db?.all(sql, values) as T;
    }
}