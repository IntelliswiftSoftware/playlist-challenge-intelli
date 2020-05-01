import { tableNames } from '../constants/dbConstants';
import PlaylistSongsObject from '../interfaces/PlaylistSongsObject';

class PlaylistSongs {
    private db;
    public data;
    constructor(db) {
        this.db = db;
    }

    public insertPlaylistSongs(playlistSongsObject: PlaylistSongsObject) {
        const query = `INSERT INTO ${tableNames.PLAYLIST_SONGS} (songId, playlistId, createDate)
        VALUES ( '${playlistSongsObject.songId}', '${playlistSongsObject.playlistId}', now())`;
        return this.db.any(query).then(data=>{
            return {
                message: 'Song added successfully in to playlist',
                success: true
            }
        }).catch(err=>{
            console.log('Eror in error', err);
        });
    }

    public deletePlaylistSong(songId:number, playlistId:number) {
        const query = `DELETE FROM ${tableNames.PLAYLIST_SONGS} WHERE songId =${songId} AND playlistId = ${playlistId}`;
        return this.db.any(query).then(data => {
            return {
                message: 'Song deleted successfully from playlist',
                success: true
            }
        }).catch(err=>{
            console.log('Eror in error', err);
        });
    }
}

export default PlaylistSongs;
