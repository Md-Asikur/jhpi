import { Router } from 'express';

import { createRoom, deleteRoom, getRooms, updateRoom } from '../controllers/room.js';
import auth from '../middleware/auth.js';
import cheackAccess from '../middleware/cheackAccess.js';
import roomPermissions from '../middleware/permissions/room/roomPermissions.js';


const roomRouter = Router();
roomRouter.post('/',auth, createRoom);//auth
roomRouter.get('/', getRooms);
roomRouter.delete('/:roomId',auth,cheackAccess(roomPermissions.delete), deleteRoom);
roomRouter.patch("/:roomId", auth, cheackAccess(roomPermissions.update), updateRoom);
export default roomRouter;
