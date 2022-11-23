require("dotenv").config()
const port = process.env.PORT;
const fs = require('fs')
console.log(port);
const express = require('express');
const prixRoutes = require("./routes/prix.router");
const prixController = require("./controllers/prix.controller");
const bodyParser = require('body-parser');
const { array } = require("yargs");

const app = express();

app.use(bodyParser.json())

const price = JSON.parse(fs.readFileSync('./prize.json'))

app.get('/', (req, res) => {
    const message = 'Hello World !'
    res.send(message)
})

//affichage de tous les éléments de prize 
//http://localhost:3000/api/prize?page=3&limite=2 avec page le numéro de page et limite le nombre d'éléments par page
app.get('/api/prize', (req, res) => {
    const page = req.query.page
    const limite = req.query.limite
    const debut = (page - 1) * limite
    const fin = page * limite
    const result = price.slice(debut, fin)
    res.json(result)
})

app.get('/api/prize/:id', (req, res) => {
    const id = req.params.id
    let result = null
    let i = null
    price.forEach(element => {
        if (element.laureates != null) {
            i = element.laureates.length
            for (let j = 0 ; j < i ; j++) {
                if (element.laureates[j].id == id) {
                    result = element.laureates[j]
                }   
            }
        }
    });
    res.json(result)
})





app.listen(port, () => {
    console.log(`Le serveur ecoute sur port ${port}`)
})