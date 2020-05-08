import debugLib from 'debug';
const debug = debugLib('SongsDao');

import { tableNames, mostplayedSongsCount, mostLikeSongsCount, recentPlayedSongsCount } from '../constants/dbConstants';
import { SONG_PLAY_EVENT_SUCCESS, SONG_LIKE_EVENT_SUCCESS, SONG_UNLIKE_SUCCESS, SONG_LIKE_EVENT_FAILED} from '../constants/messages';

/**
 * This is DAO class for table 'SONGS'
 */

class Songs {
    private db;

    constructor(db) {
        this.db = db;
    }

    public insertSong(title, artistId, imageId, duration, source, genreId,createdBy) {
        const query = `INSERT INTO ${tableNames.SONGS} (title, artistId, imageId, duration, source, genreId, createDate, createdBy)
        VALUES ('${title}','${artistId}', '${imageId}', ${duration}, '${source}', '${genreId}',now(),${createdBy})`;
        return this.db.any(query);
    }
    
    
     public async insertLikeSong(userId: number, songId: number) {
        /**
       * Insert like song event for user, if song already exists then skip
       */
        try {
            const selectquery = `SELECT songId FROM ${tableNames.SONGS_LIKES_MAP} WHERE userId = ${userId} AND songId = ${songId}`;
            let selectResult = await this.db.any(selectquery);
            debug('select like song for userId:%d and songId:%d result: ',userId, songId, selectResult);
    
            if ( selectResult.length === 0 )  {
                const insertquery = `INSERT INTO ${tableNames.SONGS_LIKES_MAP} ( songId, userId, createDate )
                VALUES (${songId}, ${userId}, now())`;
                let insertResult = await this.db.any(insertquery);
                debug('insert like song for userId:%d and songId:%d result: ',userId, songId, insertResult)
            }
            return {
                message: SONG_LIKE_EVENT_SUCCESS,
                success: true
            };
        } catch (err) {
            debug('Error in insert like song err: %s', err.message)
            return {
                message: SONG_LIKE_EVENT_FAILED,
                success: true
            };
        }

  }
    public insertPlaySong(userId: number, songId: number, playCount: number) {

          /**
         * Insert play song event for user, if song already exists then increment the count
         */

        const insertquery = `INSERT INTO ${tableNames.SONGS_PLAY_HISTORY} ( songId, userId, lastplayDate, playCount )
        VALUES (${songId}, ${userId}, now(), ${playCount})`;
        const selectquery = `SELECT songId, playCount FROM ${tableNames.SONGS_PLAY_HISTORY} WHERE userId = ${userId} AND songId = ${songId}`;
        let promise = new Promise((resolve, reject) => {
            this.db.one(selectquery).then( Song=> {
                const updateQuery = `update ${tableNames.SONGS_PLAY_HISTORY} set playcount = ${ Song.playcount + playCount }
                WHERE userId = ${userId} AND songId = ${songId}`;

                this.db.any(updateQuery).then( data => {
                    resolve( {
                        message: SONG_PLAY_EVENT_SUCCESS,
                        success: true
                    });
                }).catch(err => reject(err));

            }).catch( err => {
                if ( err.message === 'No data returned from the query.') {
                    this.db.any(insertquery).then( data => {
                        resolve( {
                            message: SONG_PLAY_EVENT_SUCCESS,
                            success: true
                        });
                    }).catch(err => reject(err));
                }
            });
          });

        return promise;
    }

    // Delete Song by song id
    public unlikeSong(userId:number, songId:number) {
        const query = `DELETE FROM ${tableNames.SONGS_LIKES_MAP} WHERE songId=${songId} and userId=${userId}`;
        return this.db.any(query).then(data => {
            return {
                message: SONG_UNLIKE_SUCCESS,
                success: true
            }
        });
    }

    // Delete Song by song id
    public deleteSong(songId) {
        const query = `DELETE FROM ${tableNames.SONGS} WHERE id=${songId}`;
        return this.db.any(query);
    }

    // Get songs by id
    public getSongById(userId: number, songId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id = ${songId}`;
        return this.db.one(query);
    }

    // Get songs by mood id
    public getSongByMood(userId: number,moodId: number) {

        const query = `SELECT s.*, smm.moodid FROM songs as s
        left join ${tableNames.SONGS_MOOD_MAP} as smm on (s.id = smm.songid)
        WHERE smm.moodid = ${moodId};`;

        return this.prepareSongsList(userId,query,null);
    }

    // Get songs by genre id
    public getSongByGenre(userId: number, genreId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE genreId = ${genreId}`;
        return this.prepareSongsList(userId,query,null);
    }

    // Get new release songs
    public getNewReleaseSongs(pageSize: number, pageNumber: number, userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} ORDER BY createDate desc`;
        return this.prepareSongsList(userId,query,{
            pagination: true,
            pageSize: pageSize,
            pageNumber: pageNumber
        });
    }

    // Get playlist songs by playlist id
    public getPlayListSongs(userId: number, playlistId) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id IN ( SELECT songId FROM playlist_songs WHERE playlistId = ${playlistId} )`;
        return this.prepareSongsList(userId,query,null);
    }

    // Get image by song id
    public getImageBySongId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} WHERE id IN ( SELECT imageid FROM ${tableNames.SONGS} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    // Get song artist by song id
    public getSongArtist(id: number) {
        const query = `SELECT * FROM ${tableNames.ARTISTS} WHERE id IN ( SELECT artistid FROM ${tableNames.SONGS} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    // Get most played songs by user id
    public getMostPlayedSongs(userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id IN
        ( SELECT songid FROM ${tableNames.SONGS_PLAY_HISTORY} GROUP BY  songid ORDER BY sum(playCount) desc LIMIT ${mostplayedSongsCount})`;
        return this.prepareSongsList(userId,query,null);
    }

    // Get most liked songs by user id
    public getmostlikedSongs(userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id 
        IN (SELECT songId FROM ${tableNames.SONGS_LIKES_MAP} GROUP BY songId ORDER BY songid desc LIMIT  ${mostLikeSongsCount} )`;
        return this.prepareSongsList(userId,query,null);
    }

    // Get new release songs count
    public getNewReleaseSongsCount() {
        const query = `SELECT count(*) as count FROM ${tableNames.SONGS}`;
        return this.db.one(query);
    }

    // Get image by category id
    public getImageByCategoryId(id: number) {
        const query = `SELECT * FROM ${tableNames.IMAGES} WHERE id IN ( SELECT imageid FROM ${tableNames.SONG_CATEGORIES} WHERE id = ${id} )`;
        return this.db.one(query);
    }

    // Get recent played songs by user id
    public getRecentPlayedSongs(userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id IN
        ( SELECT songId FROM ${tableNames.SONGS_PLAY_HISTORY} WHERE userId = ${userId}  order by lastplaydate desc LIMIT ${recentPlayedSongsCount})`;
        return this.prepareSongsList(userId,query,null);
    }

    // Get Songs liked by user id
    public getSongsLiked(userId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE id IN ( SELECT songId FROM ${tableNames.SONGS_LIKES_MAP} WHERE userId = ${userId})`;
        return this.db.any(query).then(data=> {
            return data.map( s => {
                s['isLiked'] = true;
                return this.setSongDuration(s);
            })
        });
    }

    // Get playlist songs by artist id
    public getPlayListSongsByArtist(userId: number, artistId: number) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE artistId = ${artistId}`;
        return this.prepareSongsList(userId,query,null);
    }

    // Search songs
    public searchSongs(userId: number, input: string) {
        const query = `SELECT * FROM ${tableNames.SONGS} WHERE title LIKE '%${input}%' OR 
        artistId IN ( SELECT id FROM ${tableNames.ARTISTS} WHERE firstname LIKE '%${input}%' OR lastname LIKE '%${input}%' )`;
        return this.prepareSongsList(userId,query,null);
    }

    public getUserSongIdsLiked(userId: number, songIdList: Array<number>) {
        /**
         * Return list of song ids which are liked by the user from the given list of song ids
         */

        let songIds = '';
        songIdList.forEach( id => songIds+=id+',');
        songIds=songIds.substr(0,songIds.length-1);
        const query = `SELECT id FROM ${tableNames.SONGS} WHERE id IN
        ( SELECT songId FROM ${tableNames.SONGS_LIKES_MAP} WHERE userId = ${userId} AND songId IN (${songIds}))`;

        return this.db.many(query).then( data => data ).catch(err=>{
        });
    }

    private prepareSongsList(userId: number, query, options: object){
         /**
         * Return list of recent played songs by user
         */
        let promise = new Promise((resolve, reject) => {

            this.db.any(query, options).then( Songslist => {
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
            return this.setSongDuration(s);
        });

    }

    private setSongDuration(Song){
        /**
         * Format duation on song to display in UI
         */
       if ( Song.duration <= 60) {
            Song.duration += ':00';
       } else {
            let secs = Song.duration%60;
            let secsStr = ''+secs;
            if ( secs < 10) {
                secsStr='0'+secs;;
            }
            let mins = parseInt(''+(Song.duration/60));
            let minsStr = ''+mins;
            if ( mins < 10) {
                minsStr='0'+mins;;
            }
            Song.duration = `${minsStr}:${secsStr}`;
       }
       return Song;
    }
}
export default Songs;