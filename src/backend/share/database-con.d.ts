export interface DatabaseConParams {
    user: string
    host: string
    password: string
    database: string
    port: number
}

interface QueryResult<T> {
    rows: T[],
    fields: {
        name: string
        fromat: string
    }[]
}