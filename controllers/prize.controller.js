const {error} = require('console')
const {countPrize, listCategory, countAllPrize, countLaureat, countDoubleLaureat, countPrizeByYear, countLaureatByCategory, getPrizeByLaureat, getYearWithoutPrize, sortYearByNbLaureat, sortYearByNbLaureat2, getLaureatByFilter, deleteLaureat, updateLaureat, addLaureat} = require('../services/prize.service')

const controlAddLaureat = (req, res) => {
    addLaureat(req, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlUpdateLaureat = (req, res) => {
    updateLaureat(req, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlCountPrize = (req, res) => {
    countPrize((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error}); 
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlDeleteLaureat = (req, res) => {
    deleteLaureat(req, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlLaureatByFilter = (req, res) => {
    let category = req.query.category
    let surname = req.query.surname
    let firstname = req.query.firstname
    getLaureatByFilter(surname, firstname, category, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlSortYearByNbLaureat = (req, res) => {
    let sort = req.query.sort
    if (sort == 'desc') {

        sortYearByNbLaureat((error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            console.log('success')
            return res.status(200).send({success: 1, data:results});
        });
    } else if (sort == 'asc') {
        sortYearByNbLaureat2((error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            console.log('success')
            return res.status(200).send({success: 1, data:results});
        });
    } else {
        console.log('error')
        return res.status(400).send({success: 0, data: 'error'});
    }

}

const controlCountLaureatByCategory = (req, res) => {
    countLaureatByCategory((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlPrizeByLaureat = (req, res) => {
    getPrizeByLaureat(req, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlListCategory = (req, res) => {
    listCategory((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error}); 
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlCountByYear = (req, res) => {
    countPrizeByYear((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlCountAllPrize = (req, res) => {
    countAllPrize((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error}); 
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlCountLaureates = (req, res) => {
    countLaureat((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error}); 
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlDoubleLaureates = (req, res) => {
    countDoubleLaureat((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlYearWithoutPrize = (req, res) => {
    getYearWithoutPrize((error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

module.exports = {
    controlCountPrize: controlCountPrize,
    controlListCategory: controlListCategory,
    controlCountAllPrize: controlCountAllPrize,
    controlCountLaureates: controlCountLaureates,
    controlDoubleLaureates: controlDoubleLaureates,
    controlCountByYear: controlCountByYear,
    controlCountLaureatByCategory: controlCountLaureatByCategory,
    controlPrizeByLaureat: controlPrizeByLaureat,
    controlYearWithoutPrize: controlYearWithoutPrize,
    controlSortYearByNbLaureat: controlSortYearByNbLaureat,
    controlLaureatByFilter: controlLaureatByFilter,
    controlDeleteLaureat: controlDeleteLaureat,
    controlUpdateLaureat: controlUpdateLaureat,
    controlAddLaureat: controlAddLaureat
}