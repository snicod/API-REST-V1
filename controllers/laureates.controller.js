const { error } = require("console");
const { lireLaureates, afficheElement } = require("../services/laureates.service");

const controlListeLaureates = (req, res) => {
    lireLaureates(req, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error}); 
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}

const controlAfficheElement = (req, res) => {
    afficheElement(req, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error}); 
        }
        console.log('success')
        return res.status(200).send({success: 1, data:results});
    });
}


module.exports = {
    controlListeLaureates: controlListeLaureates,
    controlAfficheElement: controlAfficheElement
}
