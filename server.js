const express = require("express");
const mysql = require("mysql");
const nodemon = require("nodemon");
const app = express();
const port = 3001;
app.use(express.json());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mini_projeto",
});

app.get("/test", (req, res) => {
  res.send("It is Working!");
});

// PARTE B
app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  try {
    connection.query("SELECT * FROM products WHERE id=?", [id], (err, rows) => {
      if (rows.length === 0) {
        return res.status(404).json({ message: "Product with id " + id + " not found!!" });
      }
      const product = rows[0];
      res.status(200).json({
        id: product.id,
        name: product.name,
        barcode: product.barcode,
        department: product.department,
        description: product.description,
        review: product.review,
        weight: product.weight,
        price: product.price,
        comment: product.comment,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no server!!!" });
  }
});

app.delete('/product/:id', (req, res) =>{
  const id = req.params.id;
  try {
    connection.query("SELECT * FROM products WHERE id=?", [id], (err, rows) => {
      if (!(rows.length === 0)) { 
        try {
          connection.query("DELETE FROM products WHERE id=?", [id], (err, rows) => {
            res.status(200).json({ message: "Product with id " + id + " was deleted!!" });
          });
        } catch (err) {
          res.status(500).json({ message: "Erro no server!!!" });
        }
      }else{
        return res.status(404).json({ message: "Product with id " + id + " not found!!" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no server!!!" });
  }
});

app.post('/productSearch', (req, res) =>{
  const keyWord = req.body.word;
  var guardarId = [];
  try{
    connection.query("SELECT id, description FROM products", (err, res) =>{
      for (let index = 0; index < res.length; index++) {
        var element = res[index].description.toLowerCase();
        console.log(element);
        if(element.includes(keyWord)){
          guardarId.push(res[index].id);
        }
      }
    })
    try {
        connection.query("SELECT * FROM products WHERE ")
    } catch (error) {
      
    }
  } catch (err) {
    res.status(500).json({ message: "Erro no server!!!" });
  }
});






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
