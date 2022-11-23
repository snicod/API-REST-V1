const express = require('express')

const router = express.Router()

const {controlAfficheElement, controlListeLaureates} = require('../controllers/laureates.controller')

router.get('/laureates', controlListeLaureates)
/**
 * @swagger
 * /laureates:
 *   get:
 *      description: visualition of all laureates (F1)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: query
 *            name: page    
 *            description: page number
 *            required: false
 *            type: integer
 *          - in: query
 *            name: limite
 *            description: number of elements per page
 *            required: false
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 * 
 *
*/


router.get('/laureates/:id', controlAfficheElement)
/**
 * @swagger
 * /laureates/{id}:
 *   get:
 *      description: visualition of one laureate by ID (F1)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: path
 *            name: id    
 *            description: id laureate
 *            required: true
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 * 
 *
*/


module.exports = router


