import { tableNames } from '../constants/dbConstants';

class Users {
    private db;

    constructor(db) {
        this.db = db;
    }

    public insertUser(args) {
        const query = `INSERT INTO ${tableNames.USERS} (id, firstname, lastname, age, gender) VALUES (${args.id}, '${args.firstname}', '${args.lastname}', ${args.age}, '${args.gender}')`;
        return this.db.any(query);
    }

    public deleteUser(userId: number) {
        const query = `DELETE FROM ${tableNames.USERS} WHERE id=${userId}`;
        return this.db.any(query);
    }

    public getUserById(userId: number) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE id = ${userId}`;
        return this.db.one(query);
    }

    public getSongsLiked(userId: number) {
        const query = `SELECT * FROM songs where id in ( select songId from songs_likes_map WHERE userId = ${userId})`;
        return this.db.one(query);
    }

    public getUserByIdPassword(userId: number, password: string) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE id = ${userId} and password ='${password}'`;
        return this.db.one(query);
    }
}
export default Users;
