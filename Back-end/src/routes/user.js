var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/UserController');
const middlwareController = require('../app/controllers/MiddlewareController');
// router.get('/getAll', thuocController.getAllThuoc)
router.get('/', userController.getAllUsers)
router.get('/find/:id', middlwareController.verifyTokenJustAdminAuth, userController.getUserById)
router.get('/stats', userController.StatusOder)
router.put('/:id', middlwareController.verifyTokenAndAuthorization, userController.updateUser)

//Delete User
// [Post] /user/:id
router.delete('/:id', middlwareController.verifyTokenJustAdminAuth, userController.deleteUser)
router.get('/trash', userController.trashAccount)
router.get('/getCountDeleted', userController.getCountDeleted)
router.patch('/:id/restore', userController.restore)

module.exports = router;