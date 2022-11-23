const express = require('express')

const router = express.Router()

const {controlCountPrize, controlListCategory, controlCountAllPrize, controlCountLaureates, controlDoubleLaureates, controlCountByYear, controlCountLaureatByCategory,controlPrizeByLaureat, controlYearWithoutPrize, controlSortYearByNbLaureat, controlLaureatByFilter,controlDeleteLaureat, controlUpdateLaureat, controlAddLaureat} = require('../controllers/prize.controller')

router.get('/prize', controlCountPrize)
/**
 * @swagger
 * /prize:
 *   get:
 *      description: list of categories with number of laureates  (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/category', controlListCategory)
/**
 * @swagger
 * /prize/category:
 *   get:
 *      description: list of categories (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/count', controlCountAllPrize)
/**
 * @swagger
 * /prize/count:
 *   get:
 *      description: count the number of prize given  (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/laureates', controlCountLaureates)
/**
 * @swagger
 * /prize/laureates:
 *   get:
 *      description: count the number of laureates who won a prize   (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/laureates/double', controlDoubleLaureates)
/**
 * @swagger
 * /prize/laureates/double:
 *   get:
 *      description: list of laureates who won 2 prizes or more  (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/year', controlCountByYear)
/**
 * @swagger
 * /prize/year:
 *   get:
 *      description: how many laureates won a prize by year  (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/laureates/category', controlCountLaureatByCategory)
/**
 * @swagger
 * /prize/laureates/category:
 *   get:
 *      description: which category has the most winners  (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/laureates/:id', controlPrizeByLaureat)
/**
 * @swagger
 * /prize/laureates/{id}:
 *   get:
 *      description: show every prize a laureate won by id  (F13)
 *      tags:
 *          - prize
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id of laureat
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
*/
router.get('/prize/year/without', controlYearWithoutPrize)
/**
 * @swagger
 * /prize/year/without:
 *   get:
 *      description: list of year without prize   (F13)
 *      tags:
 *          - prize
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/
router.get('/prize/year/sort', controlSortYearByNbLaureat)
/**
 * @swagger
 * /prize/year/sort:
 *   get:
 *      description: how many    (F13)
 *      tags:
 *          - prize
 *      parameters:
 *          - in: query
 *            name: sort
 *            description: asc or desc
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/

router.get('/prize/filter', controlLaureatByFilter)
/**
 * @swagger
 * /prize/filter:
 *   get:
 *      description: filter for laureates   (F13)
 *      tags:
 *          - prize
 *      parameters:
 *          - in: query
 *            name: firstname
 *            description: firstname of laureat
 *            required: false
 *            type: string
 *          - in: query
 *            name: surname
 *            description: surname of laureat
 *            required: false
 *            type: string
 *          - in: query
 *            name: category
 *            description: category of prize
 *            required: false
 *            type: string 
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/


router.delete('/prize/delete', controlDeleteLaureat)
/**
 * @swagger
 * /prize/delete:
 *   delete:
 *      description: Used to delete a laureate by id, year, and category (F13)
 *      tags:
 *          - prize
 *      parameters:
 *          - in: query
 *            name: id
 *            description: Laureate ID
 *            required: true
 *            type: integer
 *          - in: query
 *            name: year
 *            description: Year of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: category
 *            description: Category of the Nobel Prize
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/

router.put('/prize/update', controlUpdateLaureat)
/**
 * @swagger
 * /prize/update:
 *   put:
 *      description: Used to update a laureate by id, year, and category (F13)
 *      tags:
 *          - prize
 *      parameters:
 *          - in: query
 *            name: id
 *            description: Laureate ID
 *            required: true
 *            type: integer
 *          - in: query
 *            name: year
 *            description: Year of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: category
 *            description: Category of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: motivation
 *            description: Motivation of the Nobel Prize
 *            required: true
 *            type: string
 *          
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/

router.post('/prize/add', controlAddLaureat)
/**
 * @swagger
 * /prize/add:
 *   post:
 *      description: Used to update a laureate by year, category, firstname, surname, motivation (F13)
 *      tags:
 *          - prize
 *      parameters:
 *          - in: query
 *            name: year
 *            description: Year of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: category
 *            description: Category of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: firstname
 *            description: Firstname of the laureate
 *            required: true
 *            type: string
 *          - in: query
 *            name: surname
 *            description: Surname of the laureate
 *            required: true
 *            type: string
 *          - in: query
 *            name: motivation
 *            description: Motivation of the Nobel Prize
 *            required: true
 *            type: string   
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 *
*/







module.exports = router