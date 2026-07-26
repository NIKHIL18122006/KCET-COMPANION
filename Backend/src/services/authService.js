import pool from "../config/db.js";
import bcrypt from "bcrypt";
import getToken from "../utils/tokengenerator.js";

const registerUser = async (full_name, email, password) => {

    const userExists = await pool.query("SELECT * FROM  users WHERE email = $1",[email]);

    if(userExists.rows.length > 0){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id,full_name,email`, [full_name, email, hashedPassword]);

    const user = result.rows[0];
    
    const token = getToken(user);
    return { user, token };
}

const loginUser = async (email, password) => {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if(userResult.rowCount === 0){
        throw new Error("User not found");
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    const { password_hash, ...safeUser} = user;

    const token = getToken(safeUser);

    return { user: safeUser, token };

}

const getUserById = async (id) => {
    const userResult = await pool.query("SELECT id, full_name, email FROM users WHERE id = $1", [id]);
    if(userResult.rowCount === 0){
        throw new Error("User not found");
    }
    return userResult.rows[0];
}
export default { registerUser, loginUser, getUserById };