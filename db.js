const sql = require("mssql");
require("dotenv").config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // use false if you're not on Azure
    trustServerCertificate: true, // true for local dev
  },
};

(async () => {
  try {
    await sql.connect(sqlConfig);
    console.log(`Database is connected successfully.`);
  } catch (err) {
    console.error("Database connection failed:", err);
  } finally {
    sql.close();
  }
})();
