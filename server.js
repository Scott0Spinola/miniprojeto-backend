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
      if (err) {
        return res.status(404).json({message:'errorrr'});
      }
      if(rows === 0){
        return res.status(404).json({message:"id nao foi encontrado!!!"});
      }
      const product = rows[0];
      res.status(200).json({
        id: product.id,
        name: product.name,
        barcode: product.barcode,
        department: product.department,
        review: product.review,
        weight: product.weight,
        price: product.price,
        comment: product.comment
      });
    });
  } catch (err) {
    res.status(500).json({message:"Erro no servidor!!!!"});
  }
});
/*
app.delete('/product/:id', (req, res) =>{
  const id = req.params.id;
  try {
    connection.query('DELETE FROM products WHERE id=?',[id], (err, result) =>{
      if(err){
        return res.status(500).json('')
      }
      if ()
    })
  }
})
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
