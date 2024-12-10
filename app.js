const express = require("express");
const app = express();
const port = 3300;
const mysql = require("mysql2");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const connnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "treesdb",
  multipleStatements: true,
  port: 3307,
});

connnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// http://localhost:3300/medziai
//@POST
//@ "/medziai"
app.post("/medziai", (req, res) => {
  let sql = `INSERT INTO trees (name, height, type) VALUES (?,?,?);`;

  connnection.query(
    sql,
    [req.body.name, req.body.height, req.body.type],
    (err, result) => {
      if (err) {
        console.error("Error inserting data ", err);
        return res
          .status(500)
          .json({ message: "Error inserting data.", error: err.message });
      }
    }
  );

  res.json({ message: "Data inserted succesfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});