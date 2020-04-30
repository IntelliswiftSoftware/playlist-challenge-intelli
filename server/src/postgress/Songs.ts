class Songs {
    private db;

    constructor(db) {
        this.db = db;
    }
  
    public insertSong(artistId, imageId, duration, source, genreId) {
        let id = 312;
        const query = `INSERT INTO songs (id, artistId, imageId, duration, source, genreId) VALUES (${id}, '${artistId}', '${imageId}', ${duration}, '${source}', '${genreId}')`;
        return this.db.any(query);
    }

    public deleteSong(songId) {
        const query = `DELETE FROM songs WHERE id=${songId}`;
        return this.db.any(query);
    }

    public getSongById(songId) {
        const query = `SELECT * FROM songs WHERE id = ${songId}`;
        return this.db.one(query);
    }

    public getSongByMood(moodId) {
        const query = `SELECT * FROM songs WHERE id in ( SELECT songId FROM songs_moods_map where moodId = ${moodId} )`;
        return this.db.one(query);
    }

    public getSongByGenre(genreId) {
        const query = `SELECT * FROM songs WHERE genreId = ${genreId}`;
        return this.db.one(query);
    }

    public getNewSongs(count) {
        const query = `SELECT * FROM songs orderby createDate limit to ${count}`;
        return this.db.one(query);
    }
}
export default Songs;