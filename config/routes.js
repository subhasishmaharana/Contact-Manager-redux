const express = require('express')
const router = express.Router()



const {upload} = require('../app/middlewares/multer' )
const usersController = require('../app/controllers/UsersController')
const contactController = require('../app/controllers/ContactController')

const { authenticateUser } = require('../app/middlewares/authentication')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

router.get('/contacts', authenticateUser, contactController.list)
router.post('/contacts',  upload.single('picture'), authenticateUser, contactController.create)
router.get('/contacts/:id', authenticateUser, contactController.show)
router.put('/contacts/:id',  upload.single('picture'), authenticateUser, contactController.update)
router.delete('/contacts/:id', authenticateUser, contactController.destroy)

module.exports = router
