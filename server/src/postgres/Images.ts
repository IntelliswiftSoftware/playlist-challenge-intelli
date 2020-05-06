import { tableNames } from '../constants/dbConstants';

class Images {
    private db;

    constructor(db) {
        this.db = db;
    }
  
    public insertImage(low, mid, high, basepath) {
        const query = `INSERT INTO ${tableNames.IMAGES} (low, mid, high, basepath) VALUES ('${low}', '${mid}', '${high}','${basepath}')`;
        return this.db.any(query);
    }

    public deleteImage(imageId) {
        const query = `DELETE FROM ${tableNames.IMAGES} WHERE id=${imageId}`;
        return this.db.any(query);
    }

    public getImages(imageId) {
        let query = `SELECT * FROM ${tableNames.IMAGES}`;
        if ( imageId ){
            query = `SELECT * FROM ${tableNames.IMAGES} WHERE id = ${imageId}`;
        }
        return this.db.many(query);
    }
}
export default Images;