import mysql, { RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'danielDb2023',
    port: 3306,
    database: 'vacations_db'
});

export function execute<T>(query: string, params?: any[]) {
    return pool.execute<T & RowDataPacket[]>(query, params);
}

