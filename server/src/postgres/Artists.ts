import { tableNames } from '../constants/dbConstants';

class Artists {
    private db;
    constructor(db) {
        this.db = db;
    }

    public getArtists(id:number) {
        let query = `SELECT * FROM ${tableNames.ARTISTS}`;
        if ( id ){
            query = `SELECT * FROM ${tableNames.ARTISTS} WHERE id = ${ id }`;
        }
        return this.db.many(query);
    }

    public getImageByArtistId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} WHERE id IN ( SELECT imageid FROM ${tableNames.ARTISTS} WHERE id = ${id} )`;
        return this.db.one(query);
    }

}

export default Artists;
