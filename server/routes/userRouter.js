import { Router } from 'express';
import {
  getUsers,
  login,
  register,
  updateProfile,
  updateStatus,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';
import cheackAccess from '../middleware/cheackAccess.js';
import userPermissions from '../middleware/permissions/user/userPermissions.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.patch('/updateProfile', auth, updateProfile);
userRouter.get('/',auth, cheackAccess(userPermissions.listUsers),getUsers);
userRouter.patch(
  "/updateStatus/:userId",
  auth,
  cheackAccess(userPermissions.updateStatus),
  updateStatus
);

export default userRouter;
