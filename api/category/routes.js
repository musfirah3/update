const app = require('express')
const router = app.Router()
const { addCategory,CategoryByName ,getAllCategory, deleteCategory,updateCategory,getCategoryById} = require('./controller')

router.post('/category', addCategory)
router.get('/category/:name',CategoryByName)
router.get('/categorybyid/:_id',getCategoryById)
router.put('/category/:_id',updateCategory)
router.delete('/category/:_id',deleteCategory)
router.get('/all-categories', getAllCategory); 
module.exports = router