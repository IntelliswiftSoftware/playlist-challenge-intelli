class Users {
    private db;

    constructor(db) {
        this.db = db;
    }

    public insertUser(args) {
        const query = `INSERT INTO users (id, firstname, lastname, age, gender) VALUES (${args.id}, '${args.firstname}', '${args.lastname}', ${args.age}, '${args.gender}')`;
        return this.db.any(query);
    }

    public deleteUser(args) {
        const query = `DELETE FROM users WHERE id=${args.id}`;
        return this.db.any(query);
    }

    public getUserById(userId) {
        const query = `SELECT * FROM users WHERE id = ${userId}`;
        return this.db.one(query);
    }
}
export default Users;
