export class Database{
    async query<T = unknown>(sql: string, values?: any[]): Promise<T>{
        return undefined as T
    }
}