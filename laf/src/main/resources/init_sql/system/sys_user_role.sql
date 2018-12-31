DROP TABLE
    sys_user_role;
/*==============================================================*/
/* Table: sys_user_role                                         */
/*==============================================================*/
CREATE TABLE
    sys_user_role
    (
        id SERIAL NOT NULL,
        user_id INTEGER NULL,
        role_id INTEGER NULL,
        CONSTRAINT PK_SYS_USER_ROLE PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_user_role
IS
    '用户角色表';
COMMENT ON column sys_user_role.id
IS
    '角色ID';
COMMENT ON column sys_user_role.user_id
IS
    '用户ID';
COMMENT ON column sys_user_role.role_id
IS
    '角色ID';
