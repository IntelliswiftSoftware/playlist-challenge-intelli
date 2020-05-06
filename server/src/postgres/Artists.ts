import { tableNames } from '../constants/dbConstants';

/**
 * This is DAO class for table 'ARTISTS'
 */

class Artists {
    private db;
    constructor(db) {
        this.db = db;
    }

    // Get artists by id
    public getArtists(id:number) {
        let query = `SELECT * FROM ${tableNames.ARTISTS}`;
        if ( id ){
            query = `SELECT * FROM ${tableNames.ARTISTS} WHERE id = ${ id }`;
        }
        return this.db.many(query);
    }

    // Get image by artist id
    public getImageByArtistId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} WHERE id IN ( SELECT imageid FROM ${tableNames.ARTISTS} WHERE id = ${id} )`;
        return this.db.one(query);
    }

}

export default Artists;
