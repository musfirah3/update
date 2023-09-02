const app = require('express')
const { UserInfo, Login ,SignUp, getUserByEmail,getUserById , deleteUser , updateUser} = require('./controller')
const router = app.Router()


router.get('/allusers', UserInfo)
router.get('userbyemail/:email',getUserByEmail)
router.get('/user/:userid',getUserById)
router.delete('/user/:userid',deleteUser)
router.put('/user/:userid',updateUser)
router.post('/login',Login)
router.post('/signup',SignUp)

module.exports=router