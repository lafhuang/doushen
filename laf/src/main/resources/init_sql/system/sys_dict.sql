DROP TABLE
    sys_dict;
/*==============================================================*/
/* Table: sys_dict                                              */
/*==============================================================*/
CREATE TABLE
    sys_dict
    (
        id SERIAL NOT NULL,
        dict_name TEXT NULL,
        dict_value TEXT NULL,
        dict_type TEXT NULL,
        description TEXT NULL,
        sort INTEGER NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_SYS_DICT PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_dict
IS
    '数据字典表';
COMMENT ON column sys_dict.id
IS
    'ID';
COMMENT ON column sys_dict.dict_name
IS
    '标签名';
COMMENT ON column sys_dict.dict_value
IS
    '数据值';
COMMENT ON column sys_dict.dict_type
IS
    '类型';
COMMENT ON column sys_dict.description
IS
    '描述';
COMMENT ON column sys_dict.sort
IS
    '排序（升序）';
COMMENT ON column sys_dict.status
IS
    '状态：0-禁用，1-启用';
COMMENT ON column sys_dict.create_by
IS
    '创建用户';
COMMENT ON column sys_dict.create_time
IS
    '创建时间';
COMMENT ON column sys_dict.update_by
IS
    '修改用户';
COMMENT ON column sys_dict.update_time
IS
    '修改时间';
