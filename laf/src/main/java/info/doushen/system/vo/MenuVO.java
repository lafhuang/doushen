package info.doushen.system.vo;

import info.doushen.common.vo.BaseVO;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * MenuVO
 *
 * @author huangdou
 * @date 2018/12/6
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class MenuVO extends BaseVO {

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

    /** 是否选中 */
    private boolean checked = false;

}
