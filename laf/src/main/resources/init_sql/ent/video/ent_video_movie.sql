DROP TABLE
    ent_video_movie;
/*==============================================================*/
/* Table: ent_video_movie                                        */
/*==============================================================*/
CREATE TABLE
    ent_video_movie
    (
        id SERIAL NOT NULL,
        name TEXT,
        cn_name TEXT,
        source_name TEXT,
        poster TEXT,
        size TEXT,
        length TEXT,
        medium TEXT,
        encode TEXT,
        audio_encode TEXT,
        definition TEXT,
        release_date TEXT,
        region TEXT,
        movie_type TEXT,
        language TEXT,
        cn_subtitles TEXT,
        imdb_url TEXT,
        imdb_score TEXT,
        douban_url TEXT,
        douban_score TEXT,
        discribe TEXT,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_ENT_VIDEO_MOVIE PRIMARY KEY (id)
    );
COMMENT ON TABLE ent_video_movie
IS
    '电影表';
COMMENT ON column ent_video_movie.id
IS
    'ID';
COMMENT ON column ent_video_movie.name
IS
    '片名';
COMMENT ON column ent_video_movie.cn_name
IS
    '译名';
COMMENT ON column ent_video_movie.source_name
IS
    '源文件名';
COMMENT ON column ent_video_movie.poster
IS
    '海报';
COMMENT ON column ent_video_movie.size
IS
    '文件大小';
COMMENT ON column ent_video_movie.length
IS
    '时长';
COMMENT ON column ent_video_movie.medium
IS
    '媒介';
COMMENT ON column ent_video_movie.encode
IS
    '编码';
COMMENT ON column ent_video_movie.audio_encode
IS
    '音频编码';
COMMENT ON column ent_video_movie.definition
IS
    '分辨率';
COMMENT ON column ent_video_movie.release_date
IS
    '上映日期';
COMMENT ON column ent_video_movie.region
IS
    '地区';
COMMENT ON column ent_video_movie.movie_type
IS
    '类别';
COMMENT ON column ent_video_movie.language
IS
    '语言';
COMMENT ON column ent_video_movie.cn_subtitles
IS
    '中文字幕';
COMMENT ON column ent_video_movie.imdb_url
IS
    'IMDB地址';
COMMENT ON column ent_video_movie.imdb_score
IS
    'IMDB评分';
COMMENT ON column ent_video_movie.douban_url
IS
    '豆瓣地址';
COMMENT ON column ent_video_movie.douban_score
IS
    '豆瓣评分';
COMMENT ON column ent_video_movie.discribe
IS
    '简介';
COMMENT ON column ent_video_movie.create_by
IS
    '创建用户';
COMMENT ON column ent_video_movie.create_time
IS
    '创建时间';
COMMENT ON column ent_video_movie.update_by
IS
    '修改用户';
COMMENT ON column ent_video_movie.update_time
IS
    '修改时间';
