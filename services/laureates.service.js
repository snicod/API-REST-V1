const fs = require('fs')
const express = require('express')

const price = JSON.parse(fs.readFileSync('./prize.json').toString())

//affiche les éléments en choisissant le nb d'éléments et le numéro de page 
//http://localhost:3000/laureates?page=3&limite=2
const afficherPage = (req, value) => {
    try {
    let page = 0
    let limite = 0
    let debut = 0
    let fin = 0
    if (req.query.limite === undefined || req.query.page === undefined) {
        page = 1
        limite = price.length
    }
    else {
    page = req.query.page
    limite = req.query.limite
    }
    debut = (page - 1) * limite
    fin = page * limite
    return results = value.slice(debut, fin)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

//permet d'éviter les doublons dans les lauréats
const lireLaureates = (req, callback) => {
    try {
        const tab = new Array()
    price.forEach((element) => {
        if (element.laureates) {
            element.laureates.forEach((l) => {
                var test = tab.find((t) => t.id ===  l.id)
                if (!test) {
                    tab.push({
                        id: l.id,
                        firstname: l.firstname,
                        surname: l.surname
                    })
                }
            })
        }
        
    })
    const results = afficherPage(req, tab);
    return callback(null, results)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

//affiche un lauréat par son id 
const afficheElement = (req, callback) => {
    try {
        const id = req.params.id
    let result = new Array()
    price.forEach(element => {
        if (element.laureates != null) {
            element.laureates.forEach((l) => {
                if (l.id === id) {
                    result.push({
                        firstname: l.firstname,
                        surname: l.surname
                    }) 
                }  
            })  
            
        }
    });
    return callback(null, result)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}







module.exports = {
lireLaureates: lireLaureates,
afficheElement: afficheElement
}