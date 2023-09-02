const app = require('express')
const router = app.Router()
const { addBrand,brandByName, deleteBrand, updateBrand,getAllBrands,getBrandById } = require('./controller')

router.post('/brand', addBrand)
router.get('/brand/:name',brandByName)
router.get('/brand/:_id',getBrandById) 
router.put('/brand/:id',updateBrand)
router.delete('/brand/:id',deleteBrand)
router.get('/get-all-brands', getAllBrands);
module.exports = router