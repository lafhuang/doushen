DROP TABLE
    ent_music_singer;
/*==============================================================*/
/* Table: ent_music_singer                                      */
/*==============================================================*/
CREATE TABLE
    ent_music_singer
    (
        id SERIAL NOT NULL,
        name TEXT NULL,
        en_name TEXT NULL,
        region TEXT NULL,
        initial TEXT NULL,
        birthday DATE NULL,
        type TEXT NULL,
        star INTEGER NULL,
        photo TEXT NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_ENT_MUSIC_SINGER PRIMARY KEY (id)
    );
COMMENT ON TABLE ent_music_singer
IS
    '艺人表';
COMMENT ON column ent_music_singer.id
IS
    'ID';
COMMENT ON column ent_music_singer.name
IS
    '姓名';
COMMENT ON column ent_music_singer.en_name
IS
    '英文名';
COMMENT ON column ent_music_singer.region
IS
    '国家/地区';
COMMENT ON column ent_music_singer.initial
IS
    '首字母';
COMMENT ON column ent_music_singer.birthday
IS
    '出身日期';
COMMENT ON column ent_music_singer.type
IS
    '类型';
COMMENT ON column ent_music_singer.star
IS
    '星级';
COMMENT ON column ent_music_singer.photo
IS
    '照片';
COMMENT ON column ent_music_singer.create_by
IS
    '创建用户';
COMMENT ON column ent_music_singer.create_time
IS
    '创建时间';
COMMENT ON column ent_music_singer.update_by
IS
    '修改用户';
COMMENT ON column ent_music_singer.update_time
IS
    '修改时间';
