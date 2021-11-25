const response = require('express')

const getCategories = (req, res = response) => {

  console.log('llega?');
  res.status(200).json({
    ok:true,
    msg: 'Desde getcategories'
  })
}

const getGameInfo = () => {

  res.json({
    ok:true,
    msg: 'Desde getGameInfo'
  })
}



module.exports = {
  getCategories,
  getGameInfo,
}