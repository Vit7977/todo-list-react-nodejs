import pool from "../db/pool.js";

const Tarefa = {
  async getTasks() {
    try {
      const tasks = await pool.promise().execute(`SELECT * FROM tarefa;`);

      return tasks;
    } catch (error) {
      throw error;
    }
  },
  async getTaskById(id) {
    try {
      const [task] = await pool
        .promise()
        .execute(`SELECT * FROM tarefa WHERE id = ?`, [id]);

      return task[0];
    } catch (error) {
      throw error;
    }
  },

  async getTaskByUserId(userId) {
    try {
      const [tasks] = await pool.promise().execute(
        `SELECT 
        tarefa.id,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.concluido,
        tarefa.prioridade,
        tarefa.categoria,
        tarefa.usuario,
        tarefa.created_at,
        tarefa.updated_at,
        categoria.nome AS categoriaNome
    FROM tarefa
    INNER JOIN categoria 
        ON tarefa.categoria = categoria.id
    WHERE tarefa.usuario = ?`,
        [userId],
      );

      return tasks;
    } catch (error) {
      throw error;
    }
  },

  async addTask(titulo, desc, categoriaId, usuarioId) {
    try {
      const result = await pool
        .promise()
        .execute(
          `INSERT INTO tarefa (titulo, descricao, categoria, usuario) VALUES(?, ?, ?, ?)`,
          [titulo, desc ?? null, categoriaId, usuarioId],
        );

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateTask(titulo, desc, concluido, prioridade, categoriaId, id) {
    try {
      const result = await pool
        .promise()
        .execute(
          `UPDATE tarefa SET titulo=?, descricao=?, concluido=?, prioridade=?, categoria=? WHERE id=?`,
          [titulo, desc ?? null, concluido, prioridade, categoriaId, id],
        );

      return result;
    } catch (error) {
      throw error;
    }
  },
  async deleteTask(id) {
    try {
      const result = await pool
        .promise()
        .execute(`DELETE FROM tarefa WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async completeTask(id) {
    try {
      const result = await pool
        .promise()
        .execute(`UPDATE tarefa SET concluido=1 WHERE id=?`, [id]);

      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default Tarefa;
