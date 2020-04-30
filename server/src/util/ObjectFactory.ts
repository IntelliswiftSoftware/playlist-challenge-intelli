
import DbConnector from '../postgress/PgConnector';
import Users from '../postgress/Users';
import Playlist from '../postgress/Playlist';
import Songs from '../postgress/Songs';

class ObjectFactory {

    private db : DbConnector;
    private usersDao : Users;
    private PlaylistDao : Playlist;
    private SongsDao : Songs;
    

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
}

export default ObjectFactory;