DROP TABLE
    ent_music_song;
/*==============================================================*/
/* Table: ent_music_song                                       */
/*==============================================================*/
CREATE TABLE
    ent_music_song
    (
        id SERIAL NOT NULL,
        name TEXT NULL,n
        album_id INTEGER NULL,
        issue_date DATE NULL,
        language TEXT NULL,
        type TEXT NULL,
        style TEXT NULL,
        cover TEXT NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_ent_music_song PRIMARY KEY (id)
    );
COMMENT ON TABLE ent_music_song
IS
    '专辑表';
COMMENT ON column ent_music_song.id
IS
    'ID';
COMMENT ON column ent_music_song.name
IS
    '专辑名';
COMMENT ON column ent_music_song.album_id
IS
    '歌手';
COMMENT ON column ent_music_song.issue_date
IS
    '发行日期';
COMMENT ON column ent_music_song.language
IS
    '语言';
COMMENT ON column ent_music_song.type
IS
    '类型';
COMMENT ON column ent_music_song.style
IS
    '风格';
COMMENT ON column ent_music_song.cover
IS
    '封面';
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
