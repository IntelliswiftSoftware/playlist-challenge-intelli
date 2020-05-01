
INSERT INTO images (low, mid, high) VALUES ('http://getwallpapers.com/wallpaper/full/c/c/6/1457223-beautiful-song-wallpapers-1920x1080-windows-xp.jpg', 'http://getwallpapers.com/wallpaper/full/c/c/6/1457223-beautiful-song-wallpapers-1920x1080-windows-xp.jpg', 'http://getwallpapers.com/wallpaper/full/c/c/6/1457223-beautiful-song-wallpapers-1920x1080-windows-xp.jpg');

INSERT INTO users (username, firstname, lastname, password, age, gender, imageId, createDate) VALUES ('tom123', 'Tom', 'Hanks', 'test', 40, 'Male', 1, now());
INSERT INTO users (username, firstname, lastname, password, age, gender, imageId, createDate) VALUES ('jomi123','jomi', 'banks', 'best', 40, 'Female', 1, now());


INSERT INTO playlists (title, userId, imageId, createDate, modifiedDate) VALUES ('90 Songs', 1, 1, now(), now());
INSERT INTO playlists (title, userId, imageId, createDate, modifiedDate) VALUES ('New Songs', 2, 1, now(), now());

INSERT INTO song_categories (name, description, imageId, isMood) VALUES ('classical', 'traditional indian', 1, false);
INSERT INTO song_categories (name, description, imageId, isMood) VALUES ('Sad', 'Sad songs', 1, true);
INSERT INTO song_categories (name, description, imageId, isMood) VALUES ('Romantic', 'Romantic songs', 1, true);


INSERT INTO artists (firstname, lastname, gender, imageId, createDate) VALUES ('Lata', 'Mangeshkar', 'female', 1, now());
INSERT INTO artists (firstname, lastname, gender, imageId, createDate) VALUES ('Sonu', 'Nigam', 'male', 1, now());

INSERT INTO songs (title, artistId, imageId, duration, source, genreId, createDate, createdBy) 
VALUES ('tere nam', 1, 1, 50, 'https://pwdown.com/113457/variation/190K/Bezubaan%20Kab%20Se%20-%20Street%20Dancer%203D.mp3', 1, now(), 1);

INSERT INTO songs (title, artistId, imageId, duration, source, genreId, createDate) 
VALUES ('mere nam', 1, 1, 50, 'https://pwdown.com/113457/variation/190K/Bezubaan%20Kab%20Se%20-%20Street%20Dancer%203D.mp3', 1, now());

INSERT INTO album (title, imageId, createDate) VALUES ('Sonu bhau che gane', 1, now());

INSERT INTO album_songs (songId, albumId, playOrder) VALUES (1, 1, 1);
INSERT INTO album_songs (songId, albumId, playOrder) VALUES (2, 1, 2);

INSERT INTO playlist_songs (songId, playlistId, createDate) VALUES (1, 1, now());
INSERT INTO playlist_songs (songId, playlistId, createDate) VALUES (2, 1, now());

INSERT INTO songs_moods_map (songId, moodId) VALUES (1, 2);
INSERT INTO songs_moods_map (songId, moodId) VALUES (1, 3);
INSERT INTO songs_moods_map (songId, moodId) VALUES (2, 3);
INSERT INTO songs_moods_map (songId, moodId) VALUES (2, 2);

INSERT INTO songs_likes_map (songId, userId, createDate) VALUES (1, 1, now());
INSERT INTO songs_likes_map (songId, userId, createDate) VALUES (2, 1, now());
INSERT INTO songs_likes_map (songId, userId, createDate) VALUES (2, 2, now());

INSERT INTO songs_play_history (songId, userId, lastplayDate, playCount) VALUES (1, 1, now(), 1);
INSERT INTO songs_play_history (songId, userId, lastplayDate, playCount) VALUES (2, 1, now(), 1);
INSERT INTO songs_play_history (songId, userId, lastplayDate, playCount) VALUES (1, 2, now(), 1);
INSERT INTO songs_play_history (songId, userId, lastplayDate, playCount) VALUES (2, 2, now(), 1);