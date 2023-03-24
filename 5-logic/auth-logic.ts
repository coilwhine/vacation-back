import { OkPacket } from "mysql2";
import { generateToken } from "../2-utils/auth";
import { execute } from "../2-utils/dal";
import { UserModel, UserRole } from "../4-models/userModel";
import crypto from 'crypto';

export async function getAllUsers() {
    const query = `SELECT * FROM vacations_db.users;`
    const rows = await execute(query);
    return rows[0];
}

export async function getUserById(id: number) {
    const query = `SELECT * FROM vacations_db.users WHERE id = ?;`
    const [rows] = await execute(query, [`${id}`]);
    return rows[0];
}

export async function getUserByEmail(email: string): Promise<UserModel> {
    const query = `SELECT * FROM vacations_db.users WHERE email = ?`;
    const [rows] = await execute<UserModel[]>(query, [`${email}`]);
    if (rows.length === 0) return null;
    return rows[0];
}

export async function createNewUser(user: UserModel) {

    const hash = crypto.createHash('sha256').update(user.password).digest('base64')

    const query = `INSERT INTO Users(email, password, firstName, lastName) VALUES(?,?,?,?)`;
    const [result] = await execute<OkPacket>(query, [`${user.email}`, `${hash}`, `${user.firstName}`, `${user.lastName}`]);
    const id = result.insertId;

    const formatedUser = {
        id: id,
        email: user.email,
        password: hash,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: UserRole.user
    };

    return generateToken(formatedUser);
}