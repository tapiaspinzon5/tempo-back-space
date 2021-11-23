const express = require('express');
const router = express.Router();
const { getCategories, getGameInfo } = require('../controllers/catalogo.controller');

router.get('/', getCategories)
router.get('/:id',getGameInfo)
router.post('/')

module.exports = router;