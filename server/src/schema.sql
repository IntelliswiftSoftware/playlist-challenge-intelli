  
DROP DATABASE song_playlist;

CREATE DATABASE song_playlist;

CREATE TABLE users (
id integer PRIMARY KEY, 
firstname varchar(40) NOT NULL, 
lastname varchar(40) NOT NULL,
pass varchar(100) NOT NULL, 
age integer NOT NULL, 
gender varchar(20) NOT NULL 
createDate timestamp NOT NULL
);

 
CREATE TABLE playlists (
playlistId integer PRIMARY KEY, 
title varchar(40) NOT NULL,
userId integer REFERENCES users (id)
createDate timestamp NOT NULL
modifiedDate timestamp NOT NULL
);


CREATE TABLE song_categories (
id integer PRIMARY KEY, 
genrename  varchar(1000) NOT NULL,
genrdesc varchar(1000) NOT NULL,
imageId integer REFERENCES images (id),
isMood boolean DEFAULT false, 
);

CREATE TABLE images (
id integer PRIMARY KEY, 
low varchar(1000) NOT NULL,
mid varchar(1000) NOT NULL,
high varchar(1000) NOT NULL
);


CREATE TABLE songs (
songId integer PRIMARY KEY, 
artistId integer REFERENCES artists (id)
imageId integer REFERENCES images (id) 
duration integer 
source varchar(1000) 
genreId integer REFERENCES song_categories (id)
createDate timestamp
);


CREATE TABLE album (
id integer PRIMARY KEY, 
title varchar(40) NOT NULL,
artistId integer REFERENCES users (id)
imageId integer REFERENCES images (id)
createDate timestamp NOT NULL
);


CREATE TABLE album_songs (
id integer PRIMARY KEY, 
songId integer REFERENCES songs (id) 
albumId integer REFERENCES album (id) 
);


CREATE TABLE playlist_songs (
id integer PRIMARY KEY, 
songId integer REFERENCES songs (id) 
playlistId integer REFERENCES playlists (id) 
);


CREATE TABLE songs_moods_map (
id integer PRIMARY KEY, 
songId integer REFERENCES songs (id) 
moodId varchar(100) REFERENCES song_categories (id) 
);

CREATE TABLE songs_likes_map (
id integer PRIMARY KEY, 
songId integer REFERENCES songs (id) 
userId integer REFERENCES users (id)
createDate timestamp
);


CREATE TABLE songs_play_history (
id integer PRIMARY KEY, 
songId integer REFERENCES songs (id) 
userId integer REFERENCES users (id)
lastplayDate timestamp NOT NULL,
playCount integer 
);
