class Images {
    private db;

    constructor(db) {
        this.db = db;
    }
  
    public insertImage(id, low, mid, high) {
        const query = `INSERT INTO images (id, low, mid, high) VALUES (${id}, '${low}', '${mid}', ${high})`;
        return this.db.any(query);
    }

    public deleteImage(imageId) {
        const query = `DELETE FROM images WHERE id=${imageId}`;
        return this.db.any(query);
    }

    public getImageById(imageId) {
        const query = `SELECT * FROM images WHERE id = ${imageId}`;
        return this.db.one(query);
    }
}
export default Images;