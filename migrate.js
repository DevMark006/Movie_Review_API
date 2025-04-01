const pool = require("./db");
const fs =  require("fs");

const createTables = fs.readFileSync("./migrations/create_tables.sql", "utf-8");

(async () => {
    try {
      await pool.query(createTables);
      console.log("Table created successfully");   
    } catch (err) {
      console.log("Error creating tables", err);
    } finally {
        pool.end();
    }
})();




