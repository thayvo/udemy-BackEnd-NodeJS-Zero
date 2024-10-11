import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getCustomers() {
  const [rows] = await pool.query("SELECT * FROM customers");
  return rows;
}

export async function getCustomer(ID) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM customers
    WHERE ID = ?
    `,
    [ID]
  );
  return rows[0];
}

export async function createNode(firstName, lastName) {
  const [result] = await pool.query(
    `
    INSERT INTO customers(firstName, lastName)
    VALUES (?, ?)
    `,
    [firstName, lastName]
  );

  const id = result.insertId;
  return getNode(id);
}
