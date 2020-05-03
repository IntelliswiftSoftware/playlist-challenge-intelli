import { tableNames, mostplayedSongsCount, mostLikeSongsCount, recentPlayedSongsCount } from '../constants/dbConstants';

class Songs {
    private db;

    constructor(db) {
        this.db = db;
    }

    public insertSong(artistId, imageId, duration, source, genreId) {
        const query = `INSERT INTO ${tableNames.SONGS} (id, artistId, imageId, duration, source, genreId) VALUES ('${artistId}', '${imageId}', ${duration}, '${source}', '${genreId}')`;
        return this.db.any(query);
    }

    public deleteSong(songId) {
        const query = `DELETE FROM ${tableNames.SONGS} WHERE id=${songId}`;
        return this.db.any(query);
    }

    public getSongById(userId: number, songId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id = ${songId}`;
        return this.db.one(query);
    }

    public getSongByMood(userId: number,moodId: number) {

        const query = `SELECT s.*, smm.moodid FROM songs as s
        left join songs_moods_map as smm on (s.id = smm.songid)
        WHERE smm.moodid = ${moodId};`;

        return this.prepareSongsList(userId,query,null);
    }

    public getSongByGenre(userId: number, genreId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE genreId = ${genreId}`;
        return this.prepareSongsList(userId,query,null);
    }

    public getNewReleaseSongs(pageSize: number, pageNumber: number, userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} ORDER BY createDate desc`;
        return this.prepareSongsList(userId,query,{
            pagination: true,
            pageSize: pageSize,
            pageNumber: pageNumber
        });
    }

    public getPlayListSongs(userId: number, playlistId) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id in ( SELECT songId FROM playlist_songs where playlistId = ${playlistId} )`;
        return this.prepareSongsList(userId,query,null);
    }

    public getImageBySongId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} where id in ( select imageid from ${tableNames.SONGS} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    public getSongArtist(id: number) {
        const query = `SELECT * FROM ${tableNames.ARTISTS} where id in ( select artistid from ${tableNames.SONGS} WHERE id = ${id} )`;
        return this.db.one(query);
    }
    public getMostPlayedSongs(userId: number) {
        const query = `select * from songs where id in
        ( select songid from songs_play_history GROUP BY  songid ORDER BY sum(playCount) desc limit ${mostplayedSongsCount})`;
        return this.prepareSongsList(userId,query,null);
    }

    public getmostlikedSongs(userId: number) {
        const query = `SELECT * FROM songs where id 
        in(SELECT songId FROM songs_likes_map GROUP BY songId ORDER BY songid desc limit  ${mostLikeSongsCount} )`;
        return this.prepareSongsList(userId,query,null);
    }

    public getNewReleaseSongsCount() {
        const query = `SELECT count(*) as count FROM ${tableNames.SONGS}`;
        return this.db.one(query);
    }

    public getImageByCategoryId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} where id in ( select imageid from ${tableNames.SONG_CATEGORIES} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    public getRecentPlayedSongs(userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} where id in 
        ( select songId from ${tableNames.SONGS_PLAY_HISTORY} WHERE userId = ${userId}  order by lastplaydate desc limit ${recentPlayedSongsCount})`;
        return this.prepareSongsList(userId,query,null);
    }

    public getSongsLiked(userId: number) {
        const query = `SELECT * FROM songs where id in ( select songId from songs_likes_map WHERE userId = ${userId})`;
        return this.prepareSongsList(userId,query,null);
    }

    public getUserSongIdsLiked(userId: number, songIdList: Array<number>) {
        /**
         * Return list of song ids which are liked by the user from the given list of song ids
         */
    
        let songIds = '';
        songIdList.forEach( id => songIds+=id+',');
        songIds=songIds.substr(0,songIds.length-1);
        const query = `SELECT id FROM songs where id in
        ( select songId from songs_likes_map WHERE userId = ${userId} and songId in (${songIds}))`;

        return this.db.many(query).then( data => data ).catch(err=>{
           
        });
    }

    private prepareSongsList(userId: number, query, options: object){
         /**
         * Return list of recent played songs by user
         */
        let promise = new Promise((resolve, reject) => {

            this.db.many(query, options).then( Songslist => {
             
                let songIds = Songslist.map( s => s.id );

                this.getUserSongIdsLiked(userId,songIds).then(likedSongs => {
                   
                    Songslist = this.tagLikedFlagOnSongs(Songslist, likedSongs);
                    resolve(Songslist);

                }).catch( err => reject(err));

            }).catch( err => reject(err));

          });

        return promise;
    }

    private tagLikedFlagOnSongs(Songslist, likedSongs){

        return Songslist.map( s => {
            if ( Array.isArray(likedSongs) && likedSongs.findIndex( likedSong => likedSong.id === s.id) !== -1 ) {
                s['isLiked'] = true;
            } else {
                s['isLiked'] = false;
            }
            return s;
        });

    }
}
export default Songs;