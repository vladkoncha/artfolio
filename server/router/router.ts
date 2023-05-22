import {Router} from 'express';
import {body} from 'express-validator';
import userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router: Router = Router();

router.post('/registration',
    body('email').isEmail(),
    body('username').isLength({max: 32}),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/updateProfileInfo', authMiddleware, userController.updateProfileInfo);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/:username', userController.getUserByUsername);

export default router;