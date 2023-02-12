import { execute } from "../2-utils/dal";
import { VacationModel } from "../4-models/vacationModel";

export async function getAllVacations() {
    const query = `SELECT * FROM vacations_db.vacations;`
    const rows = await execute(query);
    return rows[0];
}

export async function getVacationsCount(liked: boolean, present: boolean, future: boolean) {

    // const query = `SELECT *
    // FROM vacations_db.vacations
    // ORDER BY startDate
    // LIMIT 10
    // OFFSET ?;`

    // const rows = await execute(query, [offset.toString()]);
    // return rows[0];
}

export async function getVacationsByPage(userId: number, page: number, liked: boolean, present: boolean, future: boolean) {

    const offset = (page - 1) * 10;
    let isLiked = '';

    if (liked) {
        const dataQuery = `SELECT vacations_db.vacations.*,
        COUNT(vacations_db.likes.user_id) as "like"
        FROM vacations_db.vacations
        LEFT JOIN vacations_db.likes ON vacations_db.likes.vacation_id = vacations_db.vacations.id
        WHERE vacations_db.likes.user_id = ?
        GROUP BY vacations_db.likes.vacation_id
        ORDER BY startDate LIMIT 10 OFFSET ?;`

        const pageQuery = `SELECT COUNT(*) FROM vacations_db.likes WHERE user_id = ?;`

        const dataRows = await execute(dataQuery, [userId, offset.toString()]);
        const count = await execute(pageQuery, [userId]);

        return {
            data: dataRows[0],
            count: count[0]
        };
    }

    if (!future && !present) {
        const dataQuery = `SELECT * FROM vacations_db.vacations
        ORDER BY startDate LIMIT 10 OFFSET ?;`

        const pageQuery = `SELECT COUNT(*) FROM vacations_db.vacations;`

        const dataRows = await execute(dataQuery, [offset.toString()]);
        const count = await execute(pageQuery);

        return {
            data: dataRows[0],
            count: count[0]
        };
    }

    if (future) {
        const dataQuery = `SELECT * FROM vacations_db.vacations
        WHERE startDate > NOW()
        ORDER BY startDate LIMIT 10 OFFSET ?;`

        const pageQuery = `SELECT COUNT(*) FROM vacations_db.vacations
        WHERE startDate > NOW();`

        const dataRows = await execute(dataQuery, [offset.toString()]);
        const count = await execute(pageQuery);

        return {
            data: dataRows[0],
            count: count[0]
        };
    }

    if (present) {
        const dataQuery = `SELECT * FROM vacations_db.vacations
        WHERE startDate <= NOW() AND endDate >= NOW()
        ORDER BY startDate LIMIT 10 OFFSET ?;`

        const pageQuery = `SELECT COUNT(*) FROM vacations_db.vacations
        WHERE startDate <= NOW() AND endDate >= NOW();`

        const dataRows = await execute(dataQuery, [offset.toString()]);
        const count = await execute(pageQuery);

        return {
            data: dataRows[0],
            count: count[0]
        }
    }
}

export async function addVacation(vacation: VacationModel) {
    const query = `INSERT INTO vacations_db.vacations (destination, description, startDate, endDate, price, image) VALUES (?, ?, ?, ?, ?, ?);`
    const rows = await execute(query, [`${vacation.destination}`, `${vacation.description}`, `${vacation.startDate}`, `${vacation.endDate}`, `${vacation.price}`, `${vacation.image}`]);
    return rows[0]; // לבדוק איך אני צריך להפריד בין השם לתמונה
}

export async function deleteVacation(id: number) {
    const query = `DELETE FROM vacations_db.vacations WHERE id = ?;`
    const rows = await execute(query, [`${id}`]);
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