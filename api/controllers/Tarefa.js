import Tarefa from "../models/Tarefa.js";

const TaskController = {
  async getTasks(_, res) {
    try {
      const tasks = await Tarefa.getTasks();

      if (tasks[0].length <= 0) {
        return res.status(404).json({
          status: 404,
          msg: "Tarefas não encontradas!",
        });
      }

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: tasks[0],
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },
  async getTaskById(req, res) {
    try {
      const id = req.params.id;

      const task = await Tarefa.getTaskById(id);

      if (!task) {
        return res.status(404).json({
          status: 404,
          msg: "Tarefa não encontrada!",
        });
      }

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },
  async addTask(req, res) {
    try {
      const { titulo, descricao, categoria, usuario } = req.body;

      if (!titulo || !categoria || !usuario) {
        return res.status(400).json({
          status: 400,
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const result = await Tarefa.addTask(
        titulo,
        descricao,
        categoria,
        usuario,
      );

      return res.status(201).json({
        status: 201,
        msg: "Tarefa criada com sucesso!",
        data: result[0],
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },
  async updateTask(req, res) {
    try {
      const { titulo, descricao, concluido, prioridade, categoria, usuario } =
        req.body;
      const id = req.params.id;

      if (
        !titulo &&
        !descricao &&
        !concluido &&
        !prioridade &&
        !categoria &&
        !usuario
      ) {
        return res.status(400).json({
          status: 400,
          msg: "A tarefa não foi alterada!",
        });
      }

      const task = await Tarefa.getTaskById(id);

      if (!task) {
        return res.status(404).json({
          status: 404,
          msg: "Tarefa não encontrada!",
        });
      }

      const result = await Tarefa.updateTask(
        titulo ?? task.titulo,
        descricao,
        concluido ?? 0,
        prioridade ?? task.prioridade,
        categoria ?? task.categoria,
        id,
      );

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: result[0]
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },

  async deleteTask(req, res){
    try{
        const id = req.params.id;

        const task = await Tarefa.getTaskById(id);

        if(!task){
            return res.status(400).json({
                status: 400,
                msg: "Tarefa não encontrada!"
            })
        }

        const result = await Tarefa.deleteTask(id);

        return res.status(200).json({
            status:200,
            msg: "OK",
            data: result[0]
        })

    }catch(error){
        res.status(500).json({
            status: 500,
            data: error.message
        })
    }
  }
};

export default TaskController;
