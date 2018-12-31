DROP TABLE
    sys_dept;
/*==============================================================*/
/* Table: sys_dept                                              */
/*==============================================================*/
CREATE TABLE
    sys_dept
    (
        id SERIAL NOT NULL,
        dept_name TEXT NULL,
        parent_id INTEGER NULL,
        sort INTEGER NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_SYS_DEPT PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_dept
IS
    '部门表';
COMMENT ON column sys_dept.id
IS
    'ID';
COMMENT ON column sys_dept.dept_name
IS
    '部门名称';
COMMENT ON column sys_dept.parent_id
IS
    '上级部门ID，一级部门为0';
COMMENT ON column sys_dept.sort
IS
    '排序（升序）';
COMMENT ON column sys_dept.status
IS
    '状态：0-禁用，1-启用';
COMMENT ON column sys_dept.create_by
IS
    '创建用户';
COMMENT ON column sys_dept.create_time
IS
    '创建时间';
COMMENT ON column sys_dept.update_by
IS
    '修改用户';
COMMENT ON column sys_dept.update_time
IS
    '修改时间';
