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

}

export default Playlist;
