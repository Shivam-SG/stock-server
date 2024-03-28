const express = require('express')
const router = express.Router();

const usercontroller = require('../controllers/usercontroller');

const verifyToken = require('../middleware/verifyToken')

router.get('/', usercontroller.getAllUsers);
router.post('/', usercontroller.createUser);
router.delete('/:id', usercontroller.deleteUser);
router.get('/admin/:email', usercontroller.getAdmin);
router.patch('/admin/:id', usercontroller.makeAdmin);

module.exports = router;