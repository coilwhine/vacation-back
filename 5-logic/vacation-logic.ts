import { execute } from "../2-utils/dal";

export async function getAllVacations() {
    const query = `SELECT * FROM vacations_db.vacations;`
    const rows = await execute(query);
    return rows[0];
}