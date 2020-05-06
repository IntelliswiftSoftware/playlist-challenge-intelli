import { tableNames } from '../constants/dbConstants';
import { SONG_ADD_SUCCESS_MESSAGE, SONG_DELETE_SUCCESS_MESSAGE } from '../constants/messages';
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
                message: SONG_DELETE_SUCCESS_MESSAGE,
                success: true
            }
        }).catch(err => {
            console.log('Eror in error', err);
        });
    }

    public insertPlaylistSongs(PlaylistSongsObjects) {
        const queries = []
        for ( const playlistSongsObject of PlaylistSongsObjects ) {
            const query = `INSERT INTO ${tableNames.PLAYLIST_SONGS} (songId, playlistId, createDate)
            VALUES ( '${playlistSongsObject.songId}', '${playlistSongsObject.playlistId}', now())`;
            queries.push(query);
        }
        return this.db.multiInsert(queries).then(data => {
            return {
                message: SONG_ADD_SUCCESS_MESSAGE,
                success: true
            }
        });
    }
}

export default PlaylistSongs;
