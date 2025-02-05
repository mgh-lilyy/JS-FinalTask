import pool from "../config/database.config"
class UsersModel {
     async getUsers() {
        const connection = await pool.getConnection();
        const [rows,fields] = await connection.query('SELECT * FROM users')
        connection.release();
        return rows;
    }

    async getDetailUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE id = ?`; 
            const value = [userId];
            const [rows,fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async createUser(user, salt){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (email, username, hashedPassword) VALUES (?, ?, ?)`;
            const {email, username, password} = user;
            const value = [email, username, password, salt];
            await connection.query(query, value);
            return { sucess: true, message: "Create successfully" }
        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET name = ?, email = ?, password = ?, gender = ?, age = ?, username = ? WHERE id = ?`;
            const {name, email, password, gender, age, username} = user;
            const value = [name, email, password, gender, age, username, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE id = ?`; 
            const value = [userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async getUserByUsername(username)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE username = ?`; 
            const value = [username];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }

    async getPassword(username)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT password FROM users WHERE username = ?`; 
            const value = [username];
            const [column,fields] = await connection.query(query, value);
            return column[0];
        }catch(error){
            throw error;
        }
    }

    async getUserByToken(token)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE tokenReset = ?`; 
            const value = [token];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }

    async getUserByEmail(email)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE email = ?`; 
            const value = [email];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }

    async updateToken(userId, tokenReset, expired)
    {
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET tokenReset = ?, expired = ? WHERE id = ?`;
            const value = [tokenReset, expired, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }
    async updatePassword(userId, newPassword)
    {
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET password = ? WHERE id = ?`;
            const value = [newPassword, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }
}

export default new UsersModel();