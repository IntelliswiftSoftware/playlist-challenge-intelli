import { tableNames } from '../constants/dbConstants';
import PlaylistSongsObject from '../interfaces/PlaylistSongsObject';

class PlaylistSongs {
    private db;
    public data;
    constructor(db) {
        this.db = db;
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

    public insertPlaylistSongs(PlaylistSongsObjects) {
        let boolSuccess = true;
        for (const playlistSongsObject of PlaylistSongsObjects) {
            const query = `INSERT INTO ${tableNames.PLAYLIST_SONGS} (songId, playlistId, createDate)
            VALUES ( '${playlistSongsObject.songId}', '${playlistSongsObject.playlistId}', now())`;
            this.db.any(query).then(data => {
                boolSuccess = true;
            }).catch(err => {
                boolSuccess = false;
                console.log('Error', err);
            });
        }
        if(boolSuccess){
            return {
                message: 'Songs Added successfully to playlist.',
                success: boolSuccess,
            }
        } else{
            return {
                message: 'Failed to add songs in  playlist.',
                success: boolSuccess,
            }
        }
    }
}

export default PlaylistSongs;
