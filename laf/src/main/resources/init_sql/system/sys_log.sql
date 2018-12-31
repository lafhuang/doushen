DROP TABLE
    sys_log;
/*==============================================================*/
/* Table: sys_log                                               */
/*==============================================================*/
CREATE TABLE
    sys_log
    (
        id SERIAL NOT NULL,
        user_id INTEGER NULL,
        user_name TEXT NULL,
        operation TEXT NULL,
        response_time INTEGER NULL,
        request_method TEXT NULL,
        request_params TEXT NULL,
        ip TEXT NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_SYS_LOG PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_log
IS
    '系统日志表';
COMMENT ON column sys_log.id
IS
    'ID';
COMMENT ON column sys_log.user_id
IS
    '用户ID';
COMMENT ON column sys_log.user_name
IS
    '用户名';
COMMENT ON column sys_log.operation
IS
    '日志内容';
COMMENT ON column sys_log.response_time
IS
    '响应时间';
COMMENT ON column sys_log.request_method
IS
    '请求方法';
COMMENT ON column sys_log.request_params
IS
    '请求参数';
COMMENT ON column sys_log.ip
IS
    'IP地址';
COMMENT ON column sys_log.create_by
IS
    '创建用户';
COMMENT ON column sys_log.create_time
IS
    '创建时间';
COMMENT ON column sys_log.update_by
IS
    '修改用户';
COMMENT ON column sys_log.update_time
IS
    '修改时间';
