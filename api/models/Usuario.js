import pool from "../db/pool.js";

const Usuario = {
  async getUsers() {
    try {
      const users = await pool.promise().execute(`SELECT * FROM usuario;`);

      return users;
    } catch (error) {
      throw error;
    }
  },
  async getUserById(id) {
    try {
      const [user] = await pool
        .promise()
        .execute(`SELECT * FROM usuario WHERE id = ?`, [id]);

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  async addUser(nome, email, senha) {
    try {
      const result = await pool
        .promise()
        .execute(`INSERT INTO usuario(nome, email, senha) VALUES(?, ?, ?);`, [
          nome,
          email,
          senha,
        ]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  async authentication(email){
    try{
      const [user] = await pool.promise().execute(`SELECT * FROM usuario WHERE email = ?`, [email]);

      return user[0];
    }catch(error){
      throw error;
    }
  },

  async updateUser(nome, senha, id) {
    try {
      const result = await pool
        .promise()
        .execute(`UPDATE usuario SET nome=?, senha=? WHERE id = ?`, [
          nome,
          senha,
          id,
        ]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const [result] = await pool
        .promise()
        .execute(`DELETE FROM usuario WHERE id=?`, [id]);

      return result[0];
    } catch (error) {
      throw error;
    }
  },
};

export default Usuario;
