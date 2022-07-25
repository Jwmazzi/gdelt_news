import { Pool } from "pg";

const pool = new Pool();

export function query(text, params, callback) {

    return pool.query(text, params, callback);
    
}