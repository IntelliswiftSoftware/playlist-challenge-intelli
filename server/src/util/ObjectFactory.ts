
import DbConnector from '../postgress/PgConnector';
import Users from '../postgress/Users';
import Playlist from '../postgress/Playlist';
import Songs from '../postgress/Songs';
import Images from '../postgress/Images';
import Artists from '../postgress/Artists';

class ObjectFactory {

    private db : DbConnector;
    private usersDao : Users;
    private PlaylistDao : Playlist;
    private SongsDao : Songs;
    private ImagesDao : Images;
    private ArtistsDao: Artists;

    constructor(){
        this.db = new DbConnector();
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
}

export default ObjectFactory;