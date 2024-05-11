import express from 'express'
import { deleteUser, getUsers } from '../controllers/users.js';

const router = express.Router()

router.get('/',getUsers);
router.delete('/:id',deleteUser);


export default router;



