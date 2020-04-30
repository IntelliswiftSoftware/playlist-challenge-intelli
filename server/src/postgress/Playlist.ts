class Playlist {
    private db;
    constructor(db) {
        this.db = db;
    }

    public getPlaylistByUserId(id:number) {
        const query = `SELECT * FROM playlist WHERE userid = ${ id }`;
        return this.db.many(query);
    }
    public getPlaylistByPlaylistid(id:number) {
        const query = `SELECT * FROM playlist WHERE playlistid = ${id}`;
        return this.db.one(query);
    }

    public insertPlaylist(playListId:number, title:string, userId:number) {
        const createDate = 23;
        const query = `INSERT INTO playlist (playListId, title, userId, createDate) VALUES (${playListId}, '${title}', '${userId}', ${createDate})`;
        return this.db.any(query);
    }
    public insertSongToPlaylist(playListId:number, songId:number) {
        const id = 23;
        const query = `INSERT INTO playlist_songs (id, songId, playlistId) VALUES (${id}, '${songId}', '${playListId}')`;
        return this.db.one(query);
    }

}

export default Playlist;
