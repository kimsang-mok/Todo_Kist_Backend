import express from "express";
import * as todosController from "../controllers/todosController.js";
import * as groupsController from "../controllers/groupsController.js"

const router = express.Router();

router.get("/:customListName", groupsController.getAllGroups, todosController.getAllTodos)
router.post("/:customListName/new", todosController.createTodo);
router.get("/:customListName/complete/:id", todosController.toggleTodoComplete);
router.delete("/:customListName/delete/:id", todosController.deleteTodo);
router.patch("/:customListName/edit/:id", todosController.editTodo);
router.get("/:customListName/search", todosController.searchTodo);
router.post("/:customListName", groupsController.createGroup);
router.delete("/:customListName/deletegroup/:groupName", groupsController.deleteGroupAndCorrespondingTaskList)

export default router;