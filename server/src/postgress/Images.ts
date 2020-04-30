import { tableNames } from '../constants/dbConstants';

class Images {
    private db;

    constructor(db) {
        this.db = db;
    }
  
    public insertImage(id, low, mid, high) {
        const query = `INSERT INTO ${tableNames.IMAGES} (id, low, mid, high) VALUES (${id}, '${low}', '${mid}', ${high})`;
        return this.db.any(query);
    }

    public deleteImage(imageId) {
        const query = `DELETE FROM ${tableNames.IMAGES} WHERE id=${imageId}`;
        return this.db.any(query);
    }

    public getImageById(imageId) {
        const query = `SELECT * FROM ${tableNames.IMAGES} WHERE id = ${imageId}`;
        return this.db.one(query);
    }
}
export default Images;