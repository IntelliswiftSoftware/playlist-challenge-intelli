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
    SONGS_PLAY_HISTORY: 'songs_play_history',
    SONGS_MOOD_MAP:'songs_moods_map'
}

export const connectionObject = {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE_NAME,
    user: process.env.RDS_DATABASE_USER,
    password: process.env.RDS_DATABASE_PASSWORD,
    max: parseInt(process.env.RDS_MAX_CONNECTIONS) || 30,
    poolIdleTimeout: parseInt(process.env.RDS_POOL_TIMEOUT) || 10000
}

export const recentPlayedSongsCount = 20;
export const mostplayedSongsCount = 50;
export const mostLikeSongsCount = 50;

export const paginationConfig = {
    pageSize: 10,
    pageNumber: 1
}
