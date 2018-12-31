DROP TABLE
    sys_file;
/*==============================================================*/
/* Table: sys_file                                              */
/*==============================================================*/
CREATE TABLE
    sys_file
    (
        id SERIAL NOT NULL,
        file_type CHAR(1) NULL,
        url INTEGER NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_SYS_FILE PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_file
IS
    '文件表';
COMMENT ON column sys_file.id
IS
    'ID';
COMMENT ON column sys_file.file_type
IS
    '文件类型';
COMMENT ON column sys_file.url
IS
    '文件url';
COMMENT ON column sys_file.create_by
IS
    '创建用户';
COMMENT ON column sys_file.create_time
IS
    '创建时间';
COMMENT ON column sys_file.update_by
IS
    '修改用户';
COMMENT ON column sys_file.update_time
IS
    '修改时间';
