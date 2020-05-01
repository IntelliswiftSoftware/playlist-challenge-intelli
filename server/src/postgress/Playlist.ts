import { tableNames } from '../constants/dbConstants';

class Playlist {
    private db;
    constructor(db) {
        this.db = db;
    }

    public getPlaylistByUserId(id:number) {
        const query = `SELECT * FROM ${tableNames.PLAYLIST} WHERE userid = ${ id }`;
        return this.db.many(query);
    }
    public getPlaylistByPlaylistid(id:number) {
        const query = `SELECT * FROM ${tableNames.PLAYLIST} WHERE id = ${id}`;
        return this.db.one(query);
    }

    public insertPlaylist(title:string, userId:number) {
        const createDate = new Date();
        const query = `INSERT INTO ${tableNames.PLAYLIST} (title, userId, createDate) VALUES ('${title}', '${userId}', ${createDate})`;
        return this.db.any(query);
    }
    public insertSongToPlaylist(playListId:number, songId:number) {
        const id = 23;
        const query = `INSERT INTO ${tableNames.PLAYLIST_SONGS} (id, songId, playlistId) VALUES (${id}, '${songId}', '${playListId}')`;
        return this.db.one(query);
    }
    public getImageByPlaylistId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} where id in ( select imageid from ${tableNames.PLAYLIST} WHERE id = ${id} )`;
        return this.db.one(query);
    }

}

export default Playlist;
