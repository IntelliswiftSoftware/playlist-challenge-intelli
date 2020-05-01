import { tableNames, mostplayedSongsCount } from '../constants/dbConstants';

class Songs {
    private db;

    constructor(db) {
        this.db = db;
    }
  
    public insertSong(artistId, imageId, duration, source, genreId) {
        let id = 312;
        const query = `INSERT INTO ${tableNames.SONGS} (id, artistId, imageId, duration, source, genreId) VALUES (${id}, '${artistId}', '${imageId}', ${duration}, '${source}', '${genreId}')`;
        return this.db.any(query);
    }

    public deleteSong(songId) {
        const query = `DELETE FROM ${tableNames.SONGS} WHERE id=${songId}`;
        return this.db.any(query);
    }

    public getSongById(songId) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id = ${songId}`;
        return this.db.one(query);
    }

    public getSongByMood(moodId) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id in ( SELECT songId FROM songs_moods_map where moodId = ${moodId} )`;
        return this.db.many(query);
    }

    public getSongByGenre(genreId) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE genreId = ${genreId}`;
        return this.db.many(query);
    }

    public getNewSongs(count) {
        const query = `SELECT * FROM ${tableNames.SONGS} orderby createDate limit to ${count}`;
        return this.db.many(query);
    }

    public getPlayListSongs(playlistId) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id in ( SELECT songId FROM playlist_songs where playlistId = ${playlistId} )`;
        return this.db.many(query);
    }

    public getImageBySongId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} where id in ( select imageid from ${tableNames.SONGS} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    public getSongArtist(id: number) {
        const query = `SELECT * FROM ${tableNames.ARTISTS} where id in ( select artistid from ${tableNames.SONGS} WHERE id = ${id} )`;
        return this.db.one(query);
    }
    public getMostPlayedSongs() {
        const query = `select * from songs where id in
        ( select songid from songs_play_history GROUP BY  songid ORDER BY sum(playCount) desc limit ${mostplayedSongsCount})`;
        return this.db.many(query);
    }
    
}
export default Songs;