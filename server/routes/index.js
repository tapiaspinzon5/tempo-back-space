const express = require('express');
const router = express.Router();
const fs = require('fs');

const pathRouter = `${__dirname}`;

// Funcion para remover las extensiones de los archivos.
const removeExtension = (fileName) => {
  return fileName.split('.').shift();
}

// Funcion para leer los archivos de las rutas.
fs.readdirSync(pathRouter).filter((file) => {

  const onlyFileName = removeExtension(file);
  const skipFiles = ['index'].includes(onlyFileName);

  if(!skipFiles){
    console.log(onlyFileName);
    router.use(`/${onlyFileName}`, require(`./${onlyFileName}.routes.js`))
  }
 
  console.log('-------->', removeExtension(file)); 
});

router.get('*', (req, res) => {
  res.status(400).json({
    ok:false,
    error:'Pagina no encontrada'
  })
})

module.exports = router;