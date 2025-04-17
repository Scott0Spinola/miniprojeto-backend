const express = require('express');
const mysql = require('mysql');
const nodemon = require('nodemon');
const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"mini_projeto",
});



app.get('/test', (req, res) =>{
  res.send('It is Working!');
});



// PARTE B
app.get('/product/:id',(req, res) =>{
  const id = req.params.id;
  try { 
    connection.query('SELECT * FROM products WHERE id=?', [id], (err, rows) => {
      if (err) {throw err;}
      if(rows === 0){
        return res.status(404).send("id nao foi encontrado!!!");
      }
      const product = rows[0];
      res.status(200).json({
        id: product.id,
        name: product.name,
        barcode: product.barcode
      });
    });
  } catch (err) {
    console.error('Erro ao buscar id:', err);
    res.status(500).send("Erro no servidor!!!!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//gay