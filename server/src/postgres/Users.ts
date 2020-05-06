import debugLib from 'debug';

const debug = debugLib('Users');

import { tableNames } from '../constants/dbConstants';
import { USERNAME_EXISTS_MESSAGE, USER_ADD_SUCCESS_MESSAGE } from '../constants/messages';

import UserObject from '../interfaces/UserObject';

/**
 * This is DAO class for table 'USERS'
 */

class Users {
    private db;

    constructor(db) {
        this.db = db;
    }

    // Insert user
    public insertUser(userObject: UserObject) {
        const query = `INSERT INTO ${tableNames.USERS} (username, firstname, lastname, age, gender, password, imageId, createDate)
        VALUES ( '${userObject.username}','${userObject.firstname}', '${userObject.lastname}', ${userObject.age}, '${userObject.gender}', 
        '${userObject.password}', ${userObject.imageId}, now())`;
        return this.db.any(query).then(data=>{
            return {
                message: USER_ADD_SUCCESS_MESSAGE,
                success: true
            }
        }).catch(err=>{
            debug('Eror in insert user', err.message);
            if ( err.message.indexOf('unique constraint "users_username_key"') ){
                return {
                    message: USERNAME_EXISTS_MESSAGE,
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

    // Delete user by id
    public deleteUser(userId: number) {

        //TODO: delete user id from refercne tables

        const query = `DELETE FROM ${tableNames.USERS} WHERE id=${userId}`;
        return this.db.any(query).then(data => {
            return {
                message: 'User deleted successfully',
                success: true
            }
        }).catch(err=>{
            debug('Eror in deleting user', err);
        });
    }

    // Get user by id
    public getUserById(userId: number) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE id = ${userId}`;
        return this.db.one(query);
    }

    // Get user by username
    public getUserByUsername(username: string) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE username = ${username}`;
        return this.db.one(query);
    }

    // Get user by id and password
    public getUserByIdPassword(username: string, password: string) {
        const query = `SELECT * FROM ${tableNames.USERS} WHERE username = '${username}' and password ='${password}'`;
        return this.db.one(query);
    }

    // Get image by user id
    public getImageByUserId(userId: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} where id in ( select imageid from ${tableNames.USERS} WHERE id = ${userId} )`;
        return this.db.one(query);
    }
}
export default Users;
