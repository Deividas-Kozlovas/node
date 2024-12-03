const express = require('express')
const app = express()
const port = 3000

let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myDatabase"
});

app.use(
    express.urlencoded({
        extended: true
    })
)

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/mediziai", (req, res) => {
    let sql= 'INSERT INTO tress (name, height, type) BALUES (?,?,?)'

    connection.query(sql, [req.body.name, req.body.height, req.body.type]);

    res.json({message: "OK"});
})

app.get('/post/:id', (req, res) => {
    res.send(`new post ${req.params.id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})