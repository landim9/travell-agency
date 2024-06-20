const express = require('express');

const router = express.Router();

const destinos = require('./controllers/destinos');
const hoteis = require('./controllers/hoteis');
const pontosTuristicos = require('./controllers/pontosTuristicos');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

//Destinos
router.post('/destinos', destinos.create);
router.get('/destinos', destinos.read);
router.get('/destinos/id/:id', destinos.readById);
router.get('/destinos/cidade/:cidade', destinos.readByCidade);
router.delete('/destinos/:id', destinos.remove);
router.put('/destinos/:id', destinos.update);


//Hoteis
router.post('/hoteis', hoteis.create);
router.get('/hoteis', hoteis.read);
router.delete('/hoteis/:id', hoteis.remove);
router.put('/hoteis/:id', hoteis.update);


//Pontos Turisticos
router.post('/pontosturisticos', pontosTuristicos.create);
router.get('/pontosturisticos', pontosTuristicos.read);
router.get('/pontosturisticos/id/:id', pontosTuristicos.readById);
router.delete('/pontosturisticos/:id', pontosTuristicos.remove);
router.put('/pontosturisticos/:id', pontosTuristicos.update);

module.exports = router;