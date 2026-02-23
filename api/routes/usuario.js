import { Router } from "express";
import UsuarioController from '../controllers/Usuario.js'
import authToken from "../middleware.js";

const router = Router();

router.get("/", UsuarioController.getUsers);

router.get("/auth/validate", authToken, (req, res)=>{
    res.json({
        msg: "Token válido!",
        user: req.user
    })
})

router.get("/:id", UsuarioController.getUserById);

router.post("/", UsuarioController.addUser);
router.post("/login", UsuarioController.authentication);
router.put("/:id", UsuarioController.updateUser);
router.delete("/:id", UsuarioController.deleteUser);

export default router;