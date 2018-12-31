DROP TABLE
    sys_user;
/*==============================================================*/
/* Table: sys_user                                              */
/*==============================================================*/
CREATE TABLE
    sys_user
    (
        id SERIAL NOT NULL,
        user_name TEXT NULL,
        name TEXT NULL,
        password TEXT NULL,
        dept_id INTEGER NULL,
        email TEXT NULL,
        mobile TEXT NULL,
        sex CHAR(1) NULL,
        birth DATE NULL,
        pic_id INTEGER NULL,
        address TEXT NULL,
        province TEXT NULL,
        city TEXT NULL,
        district TEXT NULL,
        status CHAR(1) NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_SYS_USER PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_user
IS
    '系统用户表';
COMMENT ON column sys_user.id
IS
    'ID';
COMMENT ON column sys_user.user_name
IS
    '用户名';
COMMENT ON column sys_user.name
IS
    '姓名';
COMMENT ON column sys_user.password
IS
    '密码';
COMMENT ON column sys_user.dept_id
IS
    '所属部门';
COMMENT ON column sys_user.email
IS
    '邮箱';
COMMENT ON column sys_user.mobile
IS
    '手机号';
COMMENT ON column sys_user.sex
IS
    '性别：0-女，1-男';
COMMENT ON column sys_user.birth
IS
    '出身日期';
COMMENT ON column sys_user.pic_id
IS
    '头像ID';
COMMENT ON column sys_user.address
IS
    '地址';
COMMENT ON column sys_user.province
IS
    '省份';
COMMENT ON column sys_user.city
IS
    '所在城市';
COMMENT ON column sys_user.district
IS
    '所在地区';
COMMENT ON column sys_user.status
IS
    '状态：0-禁用，1-正常';
COMMENT ON column sys_user.create_by
IS
    '创建用户';
COMMENT ON column sys_user.create_time
IS
    '创建时间';
COMMENT ON column sys_user.update_by
IS
    '修改用户';
COMMENT ON column sys_user.update_time
IS
    '修改时间';
