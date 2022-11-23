require("dotenv").config()
const port = process.env.PORT;
console.log(port);
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "my-notes app",
            description: "API documentation",
            contact: {
                name: "snicod",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);


const laureatesRoutes = require("./routes/laureates.router");
const prizeRoutes = require("./routes/prize.router")

const app = express();

app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', laureatesRoutes);
app.use('/', prizeRoutes);


app.listen(port, () => {
    console.log(`Le serveur ecoute sur port ${port}`)
})

