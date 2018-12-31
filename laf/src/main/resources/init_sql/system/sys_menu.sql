DROP TABLE
    sys_menu;
/*==============================================================*/
/* Table: sys_menu                                              */
/*==============================================================*/
CREATE TABLE
    sys_menu
    (
        id SERIAL NOT NULL,
        menu_name TEXT NULL,
        parent_id INTEGER NULL,
        url TEXT NULL,
        perms TEXT NULL,
        type TEXT NULL,
        icon TEXT NULL,
        sort INTEGER NULL,
        create_by INTEGER NULL,
        create_time TIMESTAMP NULL,
        update_by INTEGER NULL,
        update_time TIMESTAMP NULL,
        CONSTRAINT PK_SYS_MENU PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_menu
IS
    '菜单表';
COMMENT ON column sys_menu.id
IS
    'ID';
COMMENT ON column sys_menu.menu_name
IS
    '菜单名称';
COMMENT ON column sys_menu.parent_id
IS
    '父菜单ID，一级菜单为0';
COMMENT ON column sys_menu.url
IS
    '菜单URL';
COMMENT ON column sys_menu.perms
IS
    '授权(多个用逗号分隔，如：user:list,user:create)';
COMMENT ON column sys_menu.type
IS
    '类型   0：目录   1：菜单   2：按钮';
COMMENT ON column sys_menu.icon
IS
    '菜单图标';
COMMENT ON column sys_menu.order_num
IS
    '排序';
COMMENT ON column sys_menu.create_by
IS
    '创建用户';
COMMENT ON column sys_menu.create_time
IS
    '创建时间';
COMMENT ON column sys_menu.update_by
IS
    '修改用户';
COMMENT ON column sys_menu.update_time
IS
    '修改时间';
