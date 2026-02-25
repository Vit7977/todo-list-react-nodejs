import Router from 'express';
import TaskController from '../controllers/Tarefa.js';

const router = Router();

router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.get("/usuario/:id", TaskController.getTasksByUserId)
router.post("/", TaskController.addTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;