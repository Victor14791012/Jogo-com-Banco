const express = require('express');
const db = require('./conn.js');

const router = express.Router();

// Registrar um novo resultado
router.post("/", async (req, res) => {
   let col =await db.collection("score");
   let out = col.insertOne(req.body);
   res.send(out).status(204);
});


// Pegar os 10 melhores resultados
router.get("/", async (req, res) => {
    // seu código aqui
    db.historico.find().sort({
    pontos:-1 }).limit(10);
    
});

module.exports = router;
