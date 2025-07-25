const mysql = require("mysql2");

// create connection to pool server
const pool = mysql.createPool({
  host: "127.0.1.1",
  user: "root",
  password: "123456",
  port: "8811",
  database: "test",
});

const batchSize = 100000; // adjust batch size
const totalSize = 10_000_000; // adjust total size

let currentId = 1;

console.time(":::::::::TIMER::::::");
const insertBatch = async () => {
  const values = [];
  for (let i = 0; i < batchSize && currentId <= totalSize; i++) {
    const name = `name-${currentId}`;
    const age = currentId;
    const address = `address-${currentId}`;
    values.push([currentId, name, age, address]);
    currentId++;
  }

  if (!values.length) {
    console.timeEnd(":::::::::TIMER::::::");
    pool.end((err) => {
      if (err) console.log("Error occurred while running batch!!!");
      else console.log("Pool connection closed successfully!!!");
    });
    return;
  }

  const sql = "INSERT INTO test_table (id, name, age, address) VALUES ?";

  pool.query(sql, [values], async (err, results) => {
    if (err) throw err;
    console.log(`Inserted ${results.affectedRows} records`);
    insertBatch();
  });
};

insertBatch().catch(console.error);

// perform a sample action
// pool.query("SELECT 1 + 1 AS solution", (err, results) => {
//   if (err) throw err;

//   console.log(`query result::::`, results);

//   // close pool connection
//   pool.end((err) => {
//     if (err) throw err;
//     console.log("connection closed!!!");
//   });
// });
