DROP TABLE
    ent_music_song;
/*==============================================================*/
/* Table: ent_music_song                                        */
/*==============================================================*/
CREATE TABLE
    ent_music_song
    (
        id SERIAL NOT NULL,
        name TEXT NULL,
        album_id INTEGER NULL,
        track_number INTEGER NULL,
        LENGTH TEXT NULL,
        size TEXT NULL,
        audio_type TEXT NULL,
        lyrics TEXT NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_ENT_MUSIC_SONG PRIMARY KEY (id)
    );
COMMENT ON TABLE ent_music_song
IS
    '歌曲表';
COMMENT ON column ent_music_song.id
IS
    'ID';
COMMENT ON column ent_music_song.name
IS
    '歌曲名';
COMMENT ON column ent_music_song.album_id
IS
    '专辑';
COMMENT ON column ent_music_song.track_number
IS
    '音轨号';
COMMENT ON column ent_music_song.length
IS
    '时长';
COMMENT ON column ent_music_song.size
IS
    '文件大小';
COMMENT ON column ent_music_song.audio_type
IS
    '音频格式';
COMMENT ON column ent_music_song.lyrics
IS
    '歌词';
COMMENT ON column ent_music_song.create_by
IS
    '创建用户';
COMMENT ON column ent_music_song.create_time
IS
    '创建时间';
COMMENT ON column ent_music_song.update_by
IS
    '修改用户';
COMMENT ON column ent_music_song.update_time
IS
    '修改时间';
