DROP TABLE
    ent_music_album;
/*==============================================================*/
/* Table: ent_music_album                                       */
/*==============================================================*/
CREATE TABLE
    ent_music_album
    (
        id SERIAL NOT NULL,
        name TEXT NULL,
        singer_id INTEGER NULL,
        issue_date DATE NULL,
        language TEXT NULL,
        type TEXT NULL,
        style TEXT NULL,
        cover TEXT NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_ENT_MUSIC_ALBUM PRIMARY KEY (id)
    );
COMMENT ON TABLE ent_music_album
IS
    '专辑表';
COMMENT ON column ent_music_album.id
IS
    'ID';
COMMENT ON column ent_music_album.name
IS
    '专辑名';
COMMENT ON column ent_music_album.singer_id
IS
    '歌手';
COMMENT ON column ent_music_album.issue_date
IS
    '发行日期';
COMMENT ON column ent_music_album.language
IS
    '语言';
COMMENT ON column ent_music_album.type
IS
    '类型';
COMMENT ON column ent_music_album.style
IS
    '风格';
COMMENT ON column ent_music_album.cover
IS
    '封面';
COMMENT ON column ent_music_album.create_by
IS
    '创建用户';
COMMENT ON column ent_music_album.create_time
IS
    '创建时间';
COMMENT ON column ent_music_album.update_by
IS
    '修改用户';
COMMENT ON column ent_music_album.update_time
IS
    '修改时间';
