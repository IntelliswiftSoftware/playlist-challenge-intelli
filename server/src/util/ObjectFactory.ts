
import DbConnector from '../postgres/PgConnector';
import Users from '../postgres/Users';
import Playlist from '../postgres/Playlist';
import Songs from '../postgres/Songs';
import Images from '../postgres/Images';
import Artists from '../postgres/Artists';
import PlaylistSongs from '../postgres/PlaylistSongs';
import SongCategories from '../postgres/SongCategories';


/**
 * The aim of this class is to create new instance of classes and provide accrosss application.
 * A new instance of class is created only once.
 */

class ObjectFactory {

    private db : DbConnector;
    private usersDao : Users;
    private PlaylistDao : Playlist;
    private PlaylistSongsDao : PlaylistSongs;
    private SongsDao : Songs;
    private ImagesDao : Images;
    private ArtistsDao: Artists;
    private SongCategoriesDao: SongCategories;


    constructor(){
        this.db = new DbConnector();
    }


    public destroy(){
        this.db.disconnect();
    }
    
    getDbInstance(){
        return this.db;
    }

    getUsersDao(){
        if ( !this.usersDao ) {
            this.usersDao = new Users(this.db);
        }
        return this.usersDao;
    }
    getPlayListsDao(){
        if ( !this.PlaylistDao ) {
            this.PlaylistDao = new Playlist(this.db);
        }
        return this.PlaylistDao;
    }
    getPlaylistSongsDao(){
        if ( !this.PlaylistSongsDao ) {
            this.PlaylistSongsDao = new PlaylistSongs(this.db);
        }
        return this.PlaylistSongsDao;
    }
    getSongsDao(){
        if ( !this.SongsDao ) {
            this.SongsDao = new Songs(this.db);
        }
        return this.SongsDao;
    }

    getImagesDao(){
        if ( !this.ImagesDao ) {
            this.ImagesDao = new Images(this.db);
        }
        return this.ImagesDao;
    }

    getArtistsDao(){
        if ( !this.ArtistsDao ) {
            this.ArtistsDao = new Artists(this.db);
        }
        return this.ArtistsDao;
    }

    getSongCategoriesDao(){
        if ( !this.SongCategoriesDao ) {
            this.SongCategoriesDao = new SongCategories(this.db);
        }
        return this.SongCategoriesDao;
    }
}

export default ObjectFactory;