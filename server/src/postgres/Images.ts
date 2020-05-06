import { tableNames } from '../constants/dbConstants';


/**
 * This is DAO class for table 'IMAGES'
 */

class Images {
    private db;

    constructor(db) {
        this.db = db;
    }

    // Insert image
    public insertImage(low, mid, high, basepath) {
        const query = `INSERT INTO ${tableNames.IMAGES} (low, mid, high, basepath) VALUES ('${low}', '${mid}', '${high}','${basepath}')`;
        return this.db.any(query);
    }

    // Delete image by id
    public deleteImage(imageId) {
        const query = `DELETE FROM ${tableNames.IMAGES} WHERE id=${imageId}`;
        return this.db.any(query);
    }

    // Get images
    public getImages(imageId) {
        let query = `SELECT * FROM ${tableNames.IMAGES}`;
        if ( imageId ){
            query = `SELECT * FROM ${tableNames.IMAGES} WHERE id = ${imageId}`;
        }
        return this.db.many(query);
    }
}
export default Images;