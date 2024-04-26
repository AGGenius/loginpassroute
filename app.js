const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');

const app = express();

const routes = require('./routes');
const middlewares = require('./middlewares');

const PORT = 4000;

dotenv.config();

middlewares.setupAPP(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
}));

routes.setup(app);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});