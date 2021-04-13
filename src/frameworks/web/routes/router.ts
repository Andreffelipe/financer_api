import { Router } from 'express';
import { userController } from '../../factory';


const router = Router();

router.post('/auth/register', async (request, response) => {
  const result = await userController.register(request);
  return response.status(result.statusCode).json(result.body);
});
router.post('/auth/login', async (request, response) => {
  const result = await userController.login(request);
  return response.status(result.statusCode).json(result.body);
});
export default router;
