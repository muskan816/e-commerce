const express = require('express')
const {getProducts, getProduct} = require('../controllers/productcontroller')
const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)

module.exports = router