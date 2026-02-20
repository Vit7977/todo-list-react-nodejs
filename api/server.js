import express from 'express';
import cors from 'cors';
import "dotenv/config";
import UserRouter from "./routes/usuario.js"
import TaskRouter from "./routes/tarefa.js"
import CategoriesRouter from './routes/categoria.js'

const PORT = process.env.API_PORT;
const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/usuario", UserRouter)
api.use("/api/tarefa", TaskRouter)
api.use("/api/categoria", CategoriesRouter)

api.listen(PORT, ()=>{
    console.log(`API opened at http://localhost:${PORT}`);
})

api.get("/", (_, res)=>{
    res.send("HELLO WORLD!");
})