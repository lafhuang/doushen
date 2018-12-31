package info.doushen.system.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * MenuEntity
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class MenuEntity extends BaseEntity {

    /** 菜单名 */
    private String menuName;
    /** 父节点 */
    private int parentId;
    /** 菜单地址 */
    private String url;
    /** 菜单权限 */
    private String perms;
    /** 菜单类型 */
    /** 0：目录 1：菜单 2：按钮 */
    private String type;
    /** 菜单图标 */
    private String icon;
    /** 菜单排序 */
    private int sort;

}
