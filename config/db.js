import dotenv from 'dotenv'
import mysql from 'mysql2';
dotenv.config()

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection((err) => {
    if(err){
        console.error('Error connecting to database: ', err.message);
    } else {
        console.log('Connected to database.');
    }
});

export default pool.promise();