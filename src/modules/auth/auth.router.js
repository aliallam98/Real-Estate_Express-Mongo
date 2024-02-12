import {Router} from 'express'
const router = Router()
import * as authController from './auth.controller.js'
import * as authValidators from './auth.validation.js'


router.post('/signup',authController.signUp)
router.post('/login',authController.logIn)
router.post('/logout',authController.logOut)


export default router