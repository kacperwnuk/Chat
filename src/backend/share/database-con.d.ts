export interface DatabaseConParams {
    user: string
    host: string
    password: string
    database: string
    port: number
}

interface QueryResult<T = any> {
    rows: any[],
    fields: {
        name: string
        format: string
    }[]
}