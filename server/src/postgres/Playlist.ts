import debugLib from 'debug';

const debug = debugLib('Playlist');

import { tableNames } from '../constants/dbConstants';
import PlaylistObject from '../interfaces/PlaylistObject';

/**
 * This is DAO class for table 'PLAYLISTS'
 */

class Playlist {
    private db;
    constructor(db) {
        this.db = db;
    }

    // Insert playlist
    public insertPlaylist(playlistObject: PlaylistObject) {
        const query = `INSERT INTO ${tableNames.PLAYLIST} (title, userId, imageId, createDate, modifiedDate)
        VALUES ( '${playlistObject.title}', '${playlistObject.userId}', ${playlistObject.imageId}, now(), now())`;
        return this.db.any(query).then( data => {
            return {
                message: 'Playlist added successfully',
                success: true
            }
        }).catch(err=>{
            debug('Eror in insert playlist', err.message);
        });
    }

    public deletePlaylist(playlistId: number, userId: number) {
        
        const query = `DELETE FROM ${tableNames.PLAYLIST} where id=${playlistId} and userId=${userId}`;
        const deleteSongsQuery = `DELETE FROM ${tableNames.PLAYLIST_SONGS} where playlistId=${playlistId}`;

    /**
         * Return list of recent played songs by user
         */
        let promise = new Promise((resolve, reject) => {

            this.db.any(deleteSongsQuery, null).then( data => {
               
                this.db.any(query).then(data => {
                    
                    resolve({
                        message: 'Playlist deleted successfully',
                        success: true
                    });

                }).catch( err => reject(err));

            }).catch( err => reject(err));
          });

        return promise;
    }

    

    // Get playlist by user id
    public getPlaylistByUserId(id:number) {
        const query = `SELECT * FROM ${tableNames.PLAYLIST} WHERE userid = ${ id }`;
        return this.db.many(query);
    }

    // Get playlist by playlist id
    public getPlaylistByPlaylistid(id:number) {
        const query = `SELECT * FROM ${tableNames.PLAYLIST} WHERE id = ${id}`;
        return this.db.one(query);
    }

    // Insert song to playlist
    public insertSongToPlaylist(playListId:number, songId:number) {
        const query = `INSERT INTO ${tableNames.PLAYLIST_SONGS} ( songId, playlistId, createDate) VALUES ('${songId}', '${playListId}','now()')`;
        return this.db.one(query);
    }

    // Get image by Playlist id
    public getImageByPlaylistId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} WHERE id IN ( select imageid FROM ${tableNames.PLAYLIST} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    // Search playlists
    public searchPlaylists(userId: number, input: string) {
        const query = `SELECT * FROM ${tableNames.PLAYLIST} WHERE title LIKE '%${input}%' AND userId = ${userId}`;
        return this.db.any(query);
    }

    // Get playlist by song id
    public getPlaylistBySongId(songId: number, userId: number) {
        const query = `SELECT * FROM ${tableNames.PLAYLIST} WHERE 
        id IN ( SELECT playlistId FROM ${tableNames.PLAYLIST_SONGS} WHERE songid = ${songId}) AND userId = ${userId}`;
        return this.db.any(query);
    }
}

export default Playlist;
