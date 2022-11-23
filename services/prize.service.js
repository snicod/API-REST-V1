const fs = require('fs')



const price = JSON.parse(fs.readFileSync('./prize.json').toString())

//enregistre la modification dans le fichier json
const save = (fichier) => {
try {
    const dataJson = JSON.stringify(fichier)
    fs.writeFileSync('./prize.json', dataJson)
}
catch(err) {
    console.log(err);
    return callback([])
}
}

//permet d'avoir la liste de catégorie
const listCategory = (callback) => {
    try{
        let tab = new Array()

    price.forEach((element) => {
        var test = tab.find(t => t.category ===  element.category)
        if (!test) {
            tab.push({category: element.category})
        }
    })
    return callback(null, tab)
    } catch(err) {
        console.log(err);
        return callback([])
    }
    
}

//permet d'avoir le nombre de prix total
const countAllPrize = (callback) => {
    try {
        let all = 0
    price.forEach((element) => {
        if (element.laureates !== undefined) {
            all += 1
        }
    })
    return callback(null, all)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

//permet de compter le nb de lauréats qui ont obtenu un prix
const countLaureat = (callback) => {
    try {
        let tab = new Array()
    price.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((e) => {
                const test = tab.find(t => t.id === e.id)
                if (!test) {
                    tab.push(e)
                }
            })
        }
    })
    return callback(null, tab.length)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

//permet de lister les lauréats qui ont reçu plus d'un prix 
const countDoubleLaureat = (callback) => {
   try {
    let tab = new Array()
    let tab2 = new Array()
    price.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((e) => {
                let test = tab.find(t => t.id === e.id)
                if (!test) {
                    tab.push(e)
                }
                else {
                    test =  tab2.find(t => t.id === e.id)
                        if (!test) {
                        tab2.push({
                            id: e.id,
                            firstname: e.firstname,
                            surname: e.surname,
                            nbPrize: 2
                        })
                        } else {
                            test.nbPrize += 1
                        }
                }
            })
        }
    })
    return callback(null, tab2)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}


// Déterminez quelle catégorie a produit le plus grand nombre de lauréats
const countLaureatByCategory = (callback) => {
    try {
        let tab = new Array()
        let tab2 = new Array()
        price.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((e) => {
                    let test = tab.find(t => t.id === e.id)
                    if (!test) {
                        tab.push(e)
                        test = tab2.find(t => t.category === element.category)
                        if (!test) {
                            tab2.push({
                                category: element.category,
                                nb: 1
                            })
                        }
                        else {
                            test.nb += 1
                        }
                    }
                })
        }
    })
        let res = {
            category: null,
            nb: 0
        }
        tab2.forEach((e) => {
            if (res.nb < e.nb) {
                res = e
            }
        })
        return callback(null, res)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}



//compter le nombre de lauréas qui ont reçu un prix chaque année
const countPrizeByYear = (callback) => {
    try {
        let tab = new Array()
    price.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((e) => {
                let test = tab.find(t => t.year === element.year)
                if (!test) {
                    tab.push({year: element.year, nb: 1})
                }
                else {
                    test.nb += 1
                }
            })
        }
    })
    return callback(null, tab)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

                

//compte le nb de prix et les affiche (par catégorie et un total)
const countPrize = (callback) => {
    try {
        let chemistry = 0
    let economics = 0
    let literature = 0
    let peace = 0
    let physics = 0
    let medicine = 0
    let sum = 0
    let result = new Array()

    price.forEach((element) => {
        if (element.laureates != null) {
            switch(element.category) {
                case 'chemistry':
                    chemistry += 1
                break
                case 'economics':
                    economics += 1
                break
                case 'literature':
                    literature +=1
                break
                case 'peace':
                    peace+=1
                break
                case 'physics':
                    physics+=1
                break
                case 'medicine':
                    medicine +=1
                break
                default:
                    console.log('error')
            }
        }
    });

        sum = chemistry + economics + literature + peace + physics + medicine

    result.push({
        category: 'chemistry',
        nbPrize: chemistry
    })
    result.push({
        category: 'economics',
        nbPrize: economics
    })
    result.push({
        category: 'literature',
        nbPrize: literature
    })
    result.push({
        category: 'peace',
        nbPrize: peace
    })
    result.push({
        category: 'physics',
        nbPrize: physics
    })
    result.push({   
        category: 'medicine',
        nbPrize: medicine
    })
    result.push({
        category: 'all',
        nbPrize: sum
    })

    return callback(null, result)
    } catch(err) {
        console.log(err);
        return callback([])
    }

}

//Pour un identifiant de lauréat donné, affichez les prix remportés
//(prénom, nom, année, catégorie et motivation)
const getPrizeByLaureat = (req, callback) => {
    try {
        let tab = new Array()
    id = req.params.id
    price.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((e) => {
                if (e.id === id) {
                    tab.push({
                        firstname: e.firstname,
                        surname: e.surname,
                        year: element.year,
                        category: element.category,
                        motivation: element.motivation
                    })
                }
            })
        }
    })
    return callback(null, tab)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

//obtenir les années où aucun prix n'est décerné
const getYearWithoutPrize = (callback) => {
    
        let tab = []
        price.forEach((element) => {
            let test = tab.find((t) => t === element.year)
            if (!test) {
                tab.push(element.year)
            }
        })
        price.forEach((element) => {
            if (element.laureates != null) {
                for (let i = 0 ; i < tab.length ; i++) {
                    if (tab[i] === element.year) {
                        tab.splice(i, 1)
                        break
                    }
                }
            }
        })
        console.log(tab)
        return callback(null, tab)
    

}
/* trier les années en fonction du nombre de lauréats*/
const sortYearByNbLaureat = (callback) => {
    try {
        let tab = new Array()
    let tab2 = new Array()
    price.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((e) => {
                let test = tab.find(t => t.id === e.id)
                if (!test) {
                    tab.push(e)
                    test = tab2.find(t => t.year === element.year)
                    if (!test) {
                        tab2.push({
                            year: element.year,
                            nb: 1
                        })
                    }
                    else {
                        test.nb += 1
                    }
                }
            })
        }
    })
    tab2.sort((a, b) => {
        if (a.nb > b.nb) {
            return -1
        }
        if (a.nb < b.nb) {
            return 1
        }
        return 0
    })
    return callback(null, tab2)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}

const sortYearByNbLaureat2 = (callback) => {
    try {
        let tab = new Array()
        let tab2 = new Array()
        price.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((e) => {
                    let test = tab.find(t => t.id === e.id)
                    if (!test) {
                        tab.push(e)
                        test = tab2.find(t => t.year === element.year)
                        if (!test) {
                            tab2.push({
                                year: element.year,
                                nb: element.laureates.length
                            })
                        }
                        else {
                            test.nb += element.laureates.length
                        }
                    }
                })
            }
        })
        tab2.sort((a, b) => {
            if (a.nb > b.nb) {
                return 1
            }
            if (a.nb < b.nb) {
                return -1
            }
            return 0
        })
        return callback(null, tab2)
    } catch(err) {
        console.log(err);
        return callback([])
    }
}
/*À partir du prénom, ou du nom, ou de la catégorie, affichez tous les
lauréats qui correspondent au filtre.
■ Nous devrions pouvoir filtrer par différents champs */
const getLaureatByFilter = (surname, firstname, category, callback) => {
    try {
        let tab = new Array()
        console.log(surname, firstname, category);
        price.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((e) => {
                    if ((e.surname == surname || surname == null) && (e.firstname == firstname || firstname==null) && (element.category == category || category == null)) {
                        tab.push({
                            firstname: e.firstname,
                            surname: e.surname,
                            year: element.year,
                            category: element.category,
                            motivation: element.motivation
                        })
                    }
                })
            }
        })    
        return callback(null, tab)
    }
    catch(err) {
        console.log(err);
        return callback([])
    }
}

//Supprimer un lauréat avec un identifiant donné dans une année donnée et une catégorie donnée
const deleteLaureat = (req, callback) => {
    try {
        let tab = new Array()
        let id = req.query.id
        let year = req.query.year
        let category = req.query.category
        price.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((e) => {
                    if( tab.find(t => element.year === t.year && element.category === t.category) == null){
                        if (e.id != id || element.year != year || element.category != category) {
                            tab.push( {
                                year: element.year,
                                category: element.category,
                                laureates: [e]
                            })
                        } 
                    } else if (tab.find(t => element.year === t.year && element.category === t.category)) {
                        if (e.id != id || element.year != year || element.category != category) {
                            tab.forEach((t) => { 
                                if (t.year === element.year && t.category === element.category) {
                                    t.laureates.push(e)
                                }
                            })
                        }
                    }
                    })
                }
            })
        save(tab)
        return callback(null, tab)
    }
    catch(err) {
        console.log(err);
        return callback([])
}
}

// Mettre à jour la motivation d'un lauréat avec un identifiant donné dans une année donnée et une catégorie donnée. 
const updateLaureat = (req, callback) => {
    try {
        let tab = new Array()
        let id = req.query.id
        let year = req.query.year
        let category = req.query.category
        let motivation = req.query.motivation
        price.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((e) => {
                    if( tab.find(t => element.year === t.year && element.category === t.category) == null){
                        if (e.id != id || element.year != year || element.category != category) {
                            tab.push( {
                                year: element.year,
                                category: element.category,
                                laureates: [e]
                            })
                        } else {
                            tab.push( {
                                year: element.year,
                                category: element.category,
                                laureates: [{
                                    id: e.id,
                                    firstname: e.firstname,
                                    surname: e.surname,
                                    motivation: motivation
                                }]
                            })
                        }
                    } else if (tab.find(t => element.year === t.year && element.category === t.category)) {
                        if (e.id != id || element.year != year || element.category != category) {
                            tab.forEach((t) => {
                                if (t.year === element.year && t.category === element.category) {
                                    t.laureates.push(e)
                                }
                            })
                        } else {
                            tab.forEach((t) => {
                                if (t.year === element.year && t.category === element.category) {
                                    t.laureates.push({
                                        id: e.id,
                                        firstname: e.firstname,
                                        surname: e.surname,
                                        motivation: motivation
                                    })
                                }
                            })
                        }
                    }
                    })
                }
            })
        save(tab)
        return callback(null, tab)
    }
    catch(err) {
        console.log(err);
        return callback([])
    }
}

// Ajouter un lauréat dans une année donnée et une catégorie donnée.
const addLaureat = (req, callback) => {
    try {
        let tab = new Array()
        let id = null
        let year = req.query.year
        let category = req.query.category
        let motivation = req.query.motivation
        let firstname = req.query.firstname
        let surname = req.query.surname

        price.forEach((element) => {
            if (element.laureates != undefined) {
                element.laureates.forEach((e) => {
                    if (e.firstname == firstname && e.surname == surname) {
                        id = e.id
                    }
                })
            }
        })
        if (id == null) {
            id = 1
            price.forEach((element) => {
                if (element.laureates != undefined) {
                    element.laureates.forEach((e) => {
                        if (e.id >= id) {
                            id = e.id
                            id++
                        }
                    })
                }
            })
        }

        
        console.log(id)
        price.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((e) => {
                    if( tab.find(t => element.year === t.year && element.category === t.category) == null){
                        
                            tab.push( {
                                year: element.year,
                                category: element.category,
                                laureates: [e]
                            })
                        
                    } else if (tab.find(t => element.year === t.year && element.category === t.category)) {
                        
                            tab.forEach((t) => {
                                if (t.year === element.year && t.category === element.category) {
                                    t.laureates.push(e)
                                }
                            })
                         
                        }
                })
                }
      })
        tab.forEach((t) => {
            if (t.year === year && t.category === category) {
                t.laureates.push({
                    id: id.toString(),
                    firstname: firstname,
                    surname: surname,
                    motivation: motivation
                })
            }
        })    
        save(tab)
        return callback(null, tab)
    }
    catch(err) {
        console.log(err);
        return callback([])
    }
}






module.exports = {
    countPrize: countPrize,
    listCategory: listCategory,
    countAllPrize: countAllPrize,
    countLaureat: countLaureat,
    countDoubleLaureat: countDoubleLaureat,
    countPrizeByYear: countPrizeByYear,
    countLaureatByCategory: countLaureatByCategory,
    getPrizeByLaureat: getPrizeByLaureat,
    getYearWithoutPrize: getYearWithoutPrize,
    sortYearByNbLaureat: sortYearByNbLaureat,
    sortYearByNbLaureat2: sortYearByNbLaureat2,
    getLaureatByFilter: getLaureatByFilter,
    deleteLaureat: deleteLaureat,
    updateLaureat: updateLaureat,
    addLaureat: addLaureat
}