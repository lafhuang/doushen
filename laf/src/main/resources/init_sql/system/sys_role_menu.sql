DROP TABLE
    sys_role_menu;
/*==============================================================*/
/* Table: sys_role_menu                                         */
/*==============================================================*/
CREATE TABLE
    sys_role_menu
    (
        id SERIAL NOT NULL,
        role_id INTEGER NULL,
        menu_id INTEGER NULL,
        CONSTRAINT PK_SYS_ROLE_MENU PRIMARY KEY (id)
    );
COMMENT ON TABLE sys_role_menu
IS
    '角色菜单表';
COMMENT ON column sys_role_menu.id
IS
    '角色ID';
COMMENT ON column sys_role_menu.role_id
IS
    '角色ID';
COMMENT ON column sys_role_menu.menu_id
IS
    '菜单ID';
