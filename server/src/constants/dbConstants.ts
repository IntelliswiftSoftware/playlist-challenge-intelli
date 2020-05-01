export const tableNames = {
    PLAYLIST: 'playlists',
    USERS: 'users',
    IMAGES: 'images',
    SONG_CATEGORIES: 'song_categories ',
    ARTISTS: 'artists ',
    SONGS: 'songs ',
    ALBUM: 'album ',
    ALBUM_SONGS: 'album_songs ',
    PLAYLIST_SONGS: 'playlist_songs ',
    SONGS_LIKES_MAP: 'songs_likes_map ',
    SONGS_PLAY_HISTORY: 'songs_play_history'
}

export const connectionObject = {
    host: 'localhost',
    port: 5432,
    database: 'song_playlist',
    user: 'postgres',
    password: 'root',
    max: 30,
    poolIdleTimeout: 10000 
}

export const recentPlayedSongsCount = 20;

export const mostplayedSongsCount = 50;
export const mostLikeSongsCount = 50;
