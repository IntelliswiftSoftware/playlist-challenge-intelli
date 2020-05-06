import { tableNames } from '../constants/dbConstants';


/**
 * This is DAO class for table 'SONG_CATEGORIES'
 */


class SongCategories {
    private db;
    constructor(db) {
        this.db = db;
    }

    public getAllmoods() {
        const query = `SELECT * FROM ${tableNames.SONG_CATEGORIES} WHERE ismood = true`;
        return this.db.many(query);
    }

    public getAllGenres() {
        const query = `SELECT * FROM ${tableNames.SONG_CATEGORIES}  WHERE ismood = false`;
        return this.db.many(query);
    }
}

export default SongCategories;
