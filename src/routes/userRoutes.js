const Router = require('koa-router');
const userController = require('../controllers/userController');

const router = new Router({
    prefix: '/users'
});

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.del('/:id', userController.deleteUser);

module.exports = router;