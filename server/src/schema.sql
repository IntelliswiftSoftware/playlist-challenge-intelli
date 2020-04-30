  
DROP DATABASE song_playlist;

CREATE DATABASE song_playlist;

CREATE TABLE users (
id serial PRIMARY KEY, 
firstname varchar(40) NOT NULL, 
lastname varchar(40) NOT NULL,
password varchar(100) NOT NULL, 
age integer NOT NULL, 
gender varchar(20) NOT NULL,
imageId integer REFERENCES images (id),
createDate timestamp NOT NULL
);

 
CREATE TABLE playlists (
id serial PRIMARY KEY, 
title varchar(40) NOT NULL,
userId integer REFERENCES users (id),
imageId integer REFERENCES images (id),
createDate timestamp NOT NULL,
modifiedDate timestamp NOT NULL
);


CREATE TABLE images (
id serial PRIMARY KEY, 
low varchar(1000) NOT NULL,
mid varchar(1000) NOT NULL,
high varchar(1000) NOT NULL
);

CREATE TABLE song_categories (
id serial PRIMARY KEY, 
name  varchar(1000) NOT NULL,
description varchar(1000) NOT NULL,
imageId integer REFERENCES images (id),
isMood boolean DEFAULT false 
);

CREATE TABLE artists (
id serial PRIMARY KEY, 
firstname varchar(40) NOT NULL, 
lastname varchar(40) NOT NULL,
gender varchar(20) NOT NULL,
imageId integer REFERENCES images (id),
createDate timestamp
);

CREATE TABLE songs (
id serial PRIMARY KEY, 
title varchar(1000) NOT NULL,
artistId integer REFERENCES artists (id),
imageId integer REFERENCES images (id), 
duration integer, 
source varchar(1000), 
genreId integer REFERENCES song_categories (id),
createDate timestamp,
createdBy integer DEFAULT NULL
);


CREATE TABLE album (
id serial PRIMARY KEY, 
title varchar(40) NOT NULL,
imageId integer REFERENCES images (id),
createDate timestamp NOT NULL,
createdBy integer DEFAULT NULL
);


CREATE TABLE album_songs (
id serial PRIMARY KEY, 
songId integer REFERENCES songs (id), 
albumId integer REFERENCES album (id),
playOrder integer NOT NULL 
);


CREATE TABLE playlist_songs (
id serial PRIMARY KEY, 
songId integer REFERENCES songs (id),
playlistId integer REFERENCES playlists (id),
createDate timestamp NOT NULL 
);


CREATE TABLE songs_moods_map (
id serial PRIMARY KEY, 
songId integer REFERENCES songs (id), 
moodId integer REFERENCES song_categories (id) 
);

CREATE TABLE songs_likes_map (
id serial PRIMARY KEY, 
songId integer REFERENCES songs (id), 
userId integer REFERENCES users (id),
createDate timestamp NOT NULL
);


CREATE TABLE songs_play_history (
id serial PRIMARY KEY, 
songId integer REFERENCES songs (id), 
userId integer REFERENCES users (id),
lastplayDate timestamp NOT NULL,
playCount integer NOT NULL
);


