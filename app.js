const express = require("express");
const app = express();
const port = 3300;
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "treesdb",
  multipleStatements: true,
  port: 3308,
});

connection.connect(function (err) {
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

  connection.query(
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

// app.get("/medis/:id", (req, res) => {
//   let sql = `SELECT * FROM trees WHERE id = ?`;

//   connection.query(
//     sql,
//     [req.params.id];
//     function (err, result) => {
//       if(err){
//         console.error("Error geting data ", err);
//         return res
//           .status(500)
//           .json({ message: "Error insertinh data", error: err.message });
//       }
//     }
//   );
//   res.json({ me });
// });

app.delete("/delete/:id)", (req,res) => {
  let sql = `DELETE FROM tree WHERE id = ?`;

  connection.query(sql, [req.params.id], (res, result) => {
    if(err){
      console.log("erroe", err);
      return res.status(500),json({message: "error", err: err.message});
    }

    res.json({mesage: "Record delete",
      deleteRecord: {
        id: req.params.id,
        name: req.params.name,
        height: req.params.height,
        type: req.params.type
      }
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});