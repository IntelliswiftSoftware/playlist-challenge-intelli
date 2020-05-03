import { tableNames } from '../constants/dbConstants';
import PlaylistSongsObject from '../interfaces/PlaylistSongsObject';

class PlaylistSongs {
    private db;
    public data;
    constructor(db) {
        this.db = db;
    }

    public async insertPlaylistSongs(PlaylistSongsObjects:object) {
        return this.prepareInsertSongs(PlaylistSongsObjects);
    }

    public deletePlaylistSong(songId: string, playlistId: string) {
        const query = `DELETE FROM ${tableNames.PLAYLIST_SONGS} WHERE songId in ( ${songId} )  AND playlistId  in ( ${playlistId} )`;
        return this.db.any(query).then(data => {
            return {
                message: 'Song deleted successfully from playlist',
                success: true
            }
        }).catch(err => {
            console.log('Eror in error', err);
        });
    }

    private prepareInsertSongs(PlaylistSongsObjects) {
        let boolSuccess = true;
        let promise = new Promise((resolve, reject) => {

            for (const playlistSongsObject of PlaylistSongsObjects) {
                const query = `INSERT INTO ${tableNames.PLAYLIST_SONGS} (songId, playlistId, createDate)
                VALUES ( '${playlistSongsObject.songId}', '${playlistSongsObject.playlistId}', now())`;
                this.db.any(query).then(data => {
                    boolSuccess = true;
                    resolve();
                }).catch(err => {
                    boolSuccess = false;
                    reject(err)
                });
            }

        });
        if(boolSuccess){
            return {
                message: 'Songs Added successfully to playlist',
                success: true,
                promise
            }
        } else{
            return {
                message: promise,
                success: boolSuccess,
            }
        }
    }
}

export default PlaylistSongs;
