import { execute } from "../2-utils/dal";
import { VacationModel } from "../4-models/vacationModel";

export async function getAllVacations() {
    const query = `SELECT * FROM vacations_db.vacations;`
    const rows = await execute(query);
    return rows[0];
}

export async function addVacation(vacation: VacationModel) {
    const query = `INSERT INTO vacations_db.vacations (destination, description, startDate, endDate, price, image) VALUES (?, ?, ?, ?, ?, ?);`
    const rows = await execute(query, [`${vacation.destination}`, `${vacation.description}`, `${vacation.startDate}`, `${vacation.endDate}`, `${vacation.price}`, `${vacation.image}`]);
    return rows[0];
}

export async function likeVacation(user: string, vacation: string) {
    const query = `INSERT INTO vacations_db.likes (user_id, vacation_id) VALUES (?, ?);`

    const rows = await execute(query, [`${user}`, `${vacation}`]);
    return rows[0];
}

export async function unlikeVacation(user: string, vacation: string) {
    const query = `DELETE FROM vacations_db.likes WHERE user_id = ? AND vacation_id = ?;`

    const rows = await execute(query, [`${user}`, `${vacation}`]);
    return rows[0];
}

export async function userLikedVacation(user: string) {
    const query = `SELECT * FROM vacations_db.likes WHERE user_id = ?;`

    const rows = await execute(query, [`${user}`]);
    return rows[0];
}

export async function vacationLikes(id: number) {
    const query = `SELECT * FROM vacations_db.likes WHERE vacation_id = ?;`

    const rows = await execute(query, [`${id}`]);
    return rows[0];
}