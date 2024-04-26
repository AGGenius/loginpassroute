// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: Importamos los middlewares.

// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: Importamos las funcionalidades de body-parser en "middlewares.js".

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: Importamos las funcionalidades de "express-session"

// -------------------------------------------------------------------------------------

//Usado?: YES
const express = require('express');
//--- Explicación: Importamos el modulo de express.

// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: Importamos las funcionalidades de body-parser en "app.js".

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: Importamos las funcionalidades de express-session en "middlewares.js"

// -------------------------------------------------------------------------------------

//Usado?: YES 
const dotenv = require('dotenv');
//--- Explicación:Importamos las funcionalidades de dotenv en "app.js"

// -------------------------------------------------------------------------------------

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: Importamos las funcionalidades de express-session en "routes.js"

// -------------------------------------------------------------------------------------

//Usado?: YES
const routes = require('./routes');
//--- Explicación: Importamos las funcionalidades de "./routes" en "app.js"

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: Realizamos la configuración inicial de dotenv a partir del archivo ".env".

// -------------------------------------------------------------------------------------

//Usado?: YES
const app = express();
//--- Explicación: Cogemos la funcionalidad de express y la guardamos en la variable llamada app.

// -------------------------------------------------------------------------------------

//Usado?: YES
const PORT = 4000;
//--- Explicación: Declaramos una variable para asignar un puerto de acceso.

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: Importamos las funcionalidades de "dotenv" en "middlewares.js"

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: Realizamos la configuración inicial de dotenv a partir del archivo ".env".

// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación:  Invocamos la funcion "setupApp" importada de los middleware.

// -------------------------------------------------------------------------------------

//Usado?: YES 
routes.setup(app);
//--- Explicación: Llamos al "route" setup importado desde "routes.js". Recoge las funcionalidades de "express" desde el parametro "app".

// -------------------------------------------------------------------------------------

//Usado?: YES 
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};

//--- Explicación: Creamos una función de middleware para valirdar si la palabra recogida es la palabra correcta. Si lo es, lo almacena en "req.session.palabraSecreta", y continua la 
//--- ejecución con el next(), si no es correcta, redirige a la pagina principal con un codigo de error.


// -------------------------------------------------------------------------------------


//Usado?: YES
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Declaramos una variable setup que contendrá la llamada a la ruta raiz de la pagina web. //


// -------------------------------------------------------------------------------------


//Usado?: YES
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación:  Cuerpo del html que mostrara el mensaje de error de ser necesario.


// -------------------------------------------------------------------------------------

//Usado?: YES
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: Declaramos la función setupAPP.

//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación:  Declaramos el enrutamiento para SET "/profile".

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: Aplicamos el middleware "bodyParser".

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: Aplicamos la función "session" como middleware.

// -------------------------------------------------------------------------------------

//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación:  Activamos el servidor a traves de un puerto recibido como función.

// -------------------------------------------------------------------------------------

//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Verifica si la palabra almacenada en la sesión activa es la correcta. Si es correcto el middleware progresa, si no, redirige a la pagina principal con un codigo de
//-- error en la ventana del enlace. ------------//

// -------------------------------------------------------------------------------------


//Usado?: YES
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Declaramos el enrutamiento para GET"/profile".

// -------------------------------------------------------------------------------------


//Usado?: YES
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Declaramos el enrutamiento para el POST "/logout".

// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación: Exportamos la función setup para su uso en otro archivo.

// -------------------------------------------------------------------------------------

//Usado?: YES 
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exportamos del modulo de middlewares los middleware a usar en los otros archivos.

// -------------------------------------------------------------------------------------

