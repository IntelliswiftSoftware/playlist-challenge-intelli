import { tableNames } from '../constants/dbConstants';

import UserObject from '../interfaces/UserObject';

class Users {
    private db;

    constructor(db) {
        this.db = db;
    }

    public insertUser(userObject: UserObject) {
        const query = `INSERT INTO ${tableNames.USERS} (username, firstname, lastname, age, gender, password, imageId, createDate)
        VALUES ( '${userObject.username}','${userObject.firstname}', '${userObject.lastname}', ${userObject.age}, '${userObject.gender}', 
        '${userObject.password}', ${userObject.imageId}, now())`;
        return this.db.any(query).then(data=>{
            return {
                message: 'User added successfully',
                success: true
            }
        }).catch(err=>{
            if ( err.message.indexOf('unique constraint "users_username_key"') ){
                return {
                    message: 'Could not add user, username already exists',
                    success: false
                }
            } else {
                return {
                    message: 'Could not add user',
                    success: false
                }
            }
           
        });
    }

    public deleteUser(userId: number) {
        const query = `DELETE FROM ${tableNames.USERS} WHERE id=${userId}`;
        return this.db.any(query).then(data => {
            return {
                message: 'User deleted successfully',
                success: true
            }
        }).catch(err=>{
            console.log('Eror in error', err);
        });
    }

    public getUserById(userId: number) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE id = ${userId}`;
        return this.db.one(query);
    }

    public getUserByUsername(username: string) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE username = ${username}`;
        return this.db.one(query);
    }

    public getSongsLiked(userId: number) {
        const query = `SELECT * FROM songs where id in ( select songId from songs_likes_map WHERE userId = ${userId})`;
        return this.db.one(query);
    }

    public getUserByIdPassword(username: string, password: string) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE username = '${username}' and password ='${password}'`;
        return this.db.one(query);
    }

    public getImageByUserId(userId: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} where id in ( select imageid from ${tableNames.USERS} WHERE id = ${userId} )`;
        return this.db.one(query);
    }
}
export default Users;
